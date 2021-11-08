import {useEffect, useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from './store';
import { RootState } from './store/reducers';

import { Container } from './theme/global';

import {
  ContainerMain,
  HeaderDiv,
  Header,
  Informations,
  Information,
  InformationAmount,
  InformationTitle,
  TimeIcon,
  DoneIcon,
  ExpiredIcon,
  Holder,
  TaskElement,
  Desc1,
  TaskTitle,
  TaskPriority,
  TaskButton,
  TaskProgress,
  TasksHolder,
  AvailableTasks,
  Timer
} from './App.elements'

import Tasks from './components/Tasks';
//import TaskNow from './components/TaskNow';
// @ts-ignore: Unreachable code error
import TaskField from './components/TaskField.tsx';
import { Task } from './store/types';

const App = () => {
  const store = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [currentTime, currentTimeSet] = useState<Date>(new Date());
  
  const refreshClock = () => {
    currentTimeSet(new Date())
  }

  const {
    removeTaskAction,
    expireTaskAction
  } = bindActionCreators(actionCreators, dispatch)

  const [show, showSet] = useState<boolean>(false)

  const setRightDate = (ms: number) => {
    let seconds = (ms / 1000).toFixed(0).toString();
    let minutes = Math.floor(parseInt(seconds) / 60).toString();
    let hours = "";
    if (parseInt(minutes) > 59) {
        hours = Math.floor(parseInt(minutes) / 60).toString();
        hours = (parseInt(hours) >= 10) ? hours : "0" + hours;
        minutes = (parseInt(minutes) - (parseInt(hours) * 60)).toString();
        minutes = (parseInt(minutes) >= 10) ? minutes : "0" + minutes;
    }

    seconds = Math.floor(parseInt(seconds) % 60).toString();
    seconds = (parseInt(seconds) >= 10) ? seconds : "0" + seconds;
    if (hours !== "") {
        return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, [])

  return (
    <ContainerMain>
      <HeaderDiv>
          <Header>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346.54 281" width="50px" height="50px">
      <path
        fill="#fc6"
        stroke="#fc6"
        strokeMiterlimit="10"
        d="M.5 123.26h0v-.5z"
      ></path>
      <path
        fill="#262626"
        stroke="#262626"
        strokeMiterlimit="10"
        strokeWidth="39"
        d="M206 19.5a121 121 0 10121 121 121 121 0 00-121-121zm0 201.75A80.25 80.25 0 11286.29 141 80.24 80.24 0 01206 221.25z"
      ></path>
      <path
        fill="#fc6"
        stroke="#fc6"
        strokeMiterlimit="10"
        d="M206.89 19.51H206v0a20.6 20.6 0 000 41.17v0a80.25 80.25 0 11-80.25 80.5h0V141v-.5h0a20.36 20.36 0 00-40.69 0h0v.75h0a121 121 0 00122.67 120.24c65.16-.89 118.37-54.06 119.27-119.23A121 121 0 00206.89 19.51z"
      ></path>
    </svg>
            leftry.
            </Header>
      </HeaderDiv>

   
        <Tasks show={show} showSet={showSet}/>


      <Informations>
          <Information>
              <TimeIcon />
              <Holder>
                <InformationTitle>All Tasks</InformationTitle>
                <InformationAmount>{store.tasks.tasks.length} tasks</InformationAmount>
              </Holder>
          </Information>
          <Information>
              <DoneIcon />
              <Holder>
                <InformationTitle>Completed</InformationTitle>
                <InformationAmount>{store.tasks.finished.length} tasks completed</InformationAmount>
              </Holder>
          </Information>
          <Information>
              <ExpiredIcon />
              <Holder>
                <InformationTitle>Expired</InformationTitle>
                <InformationAmount>{store.tasks.expired.length} tasks expired</InformationAmount>
              </Holder>
          </Information>
      </Informations>

      <AvailableTasks>
        {store.tasks.tasks.length > 0 ? store.tasks.tasks.map((t, i) => {
          const diff = Math.abs(t.finishUntil.getTime() - currentTime.getTime());
          let hours: number;
          if(t.priority === 'high') {
            hours = 2
          } else if (t.priority === 'medium'){
            hours = 4
          } else {
            hours = 8
          }
          let startMiliseconds = hours * 60 * 60 *1000;

          const left = parseFloat(((100 * diff) / startMiliseconds).toFixed(2));
          const righty = setRightDate(diff);

          if(left <= 0.00) {
              //Expired Action
              const expiredTask: Task = {
                id: t.id,
                finishUntil: t.finishUntil,
                priority: t.priority,
                title: t.title
              }
              expireTaskAction(expiredTask)
          }

          if(i <= 2) {
            return (
              <TaskElement key={t.id}>
                <Desc1>
                    <TaskTitle>{t.title}</TaskTitle>
                    <TaskProgress>{righty}</TaskProgress>
                    <TaskPriority>{t.priority}</TaskPriority>
                </Desc1>
                <TaskButton onClick={() => removeTaskAction(t.id, t.title, t.priority, t.finishUntil)}></TaskButton>
                <Timer left={left}></Timer>
              </TaskElement>
            )
              }
              return <></>
          }) : <TaskTitle>no tasks</TaskTitle>
        }
      </AvailableTasks>

      <TaskField visible={show} visibleSet={showSet}>

      </TaskField>
      {/* <TaskNow>
      </TaskNow> */}

    </ContainerMain>
  );
}

export default App;
