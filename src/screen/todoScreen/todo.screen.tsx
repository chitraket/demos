import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Task = {
  text: string;
  completed: boolean;
};

type State = {
  tasks: Task[];
  taskText: string;
  editingTaskIndex: number | null;
  error: string | null;
};

const ToDoScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [state, setState] = useState<State>({
    tasks: [],
    taskText: '',
    editingTaskIndex: null,
    error: null,
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setState(prevState => ({
          ...prevState,
          tasks: JSON.parse(storedTasks),
        }));
      }
    } catch (error) {
      console.log('Error loading tasks from local storage:', error);
    }
  };

  const saveTasks = async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.log('Error saving tasks to local storage:', error);
    }
  };

  const addTask = () => {
    if (state.taskText.trim() === '') {
      setState(prevState => ({
        ...prevState,
        error: 'Task cannot be empty',
      }));
      return;
    }

    let updatedTasks: Task[];
    if (state.editingTaskIndex !== null) {
      updatedTasks = state.tasks.map((task, index) =>
        index === state.editingTaskIndex
          ? {...task, text: state.taskText}
          : task,
      );
    } else {
      updatedTasks = [...state.tasks, {text: state.taskText, completed: false}];
    }

    setState({
      tasks: updatedTasks,
      taskText: '',
      editingTaskIndex: null,
      error: null,
    });
    saveTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = state.tasks.map((task, i) =>
      i === index ? {...task, completed: !task.completed} : task,
    );

    setState(prevState => ({
      ...prevState,
      tasks: updatedTasks,
    }));
    saveTasks(updatedTasks);
  };

  const editTask = (index: number) => {
    setState(prevState => ({
      ...prevState,
      taskText: prevState.tasks[index].text,
      editingTaskIndex: index,
      error: null,
    }));
  };

  const deleteTask = (index: number) => {
    const updatedTasks = state.tasks.filter((_, i) => i !== index);

    setState(prevState => ({
      ...prevState,
      tasks: updatedTasks,
      error: null,
    }));
    saveTasks(updatedTasks);
  };

  return (
    <View
      style={{
        paddingLeft: Math.max(Number(insets?.left), 15),
        paddingRight: Math.max(Number(insets?.right), 15),
        paddingTop: Math.max(Number(insets?.top), 15),
        paddingBottom: Math.max(Number(insets?.bottom), 15),
      }}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={state.taskText}
        onChangeText={text =>
          setState(prevState => ({
            ...prevState,
            taskText: text,
            error: null,
          }))
        }
      />
      {state.error && <Text style={styles.errorText}>{state.error}</Text>}
      <Button
        title={state.editingTaskIndex !== null ? 'Update Task' : 'Add Task'}
        onPress={addTask}
      />
      <FlatList
        data={state.tasks}
        renderItem={({item, index}) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                item.completed
                  ? styles.checkboxCompleted
                  : styles.checkboxIncomplete,
              ]}
              onPress={() => toggleTaskCompletion(index)}
            />
            <Text
              style={[
                styles.taskText,
                item.completed ? styles.taskCompleted : styles.taskIncomplete,
              ]}>
              {item.text}
            </Text>
            <Button title="Edit" onPress={() => editTask(index)} />
            <Button
              title="Delete"
              onPress={() => deleteTask(index)}
              color="red"
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ToDoScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderColor: '#ccc',
    borderWidth: 2,
  },
  checkboxCompleted: {
    backgroundColor: 'green',
  },
  checkboxIncomplete: {
    backgroundColor: 'white',
  },
  taskText: {
    flex: 1,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskIncomplete: {
    color: '#000',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
