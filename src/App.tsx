import {useEffect, useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from './store';
import { RootState } from './store/reducers';

import { Container } from './theme/global';

import {
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
    
    <Container>
      <HeaderDiv>
          <Header>leftry.</Header>
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

    </Container>
  );
}

export default App;
