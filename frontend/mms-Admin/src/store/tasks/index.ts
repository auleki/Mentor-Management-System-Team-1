import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import axios, { type AxiosResponse } from "axios";
import { createToaster } from "@meforma/vue-toaster";
import type { ITask } from "@/typings/components";

const toaster = createToaster({
  position: "top-right",
});

const route = useRoute();

interface TasksState {
  tasks: ITask[];
  isLoading: boolean;
  errors: [];
  selectedTask: ITask;
}

export const useTasksStore = defineStore("tasks", () => {
  let tasks = ref<ITask[]>([]);
  let isLoading = ref(false);
  let errors = ref([]);
  let selectedTask = ref("");
  let taskToShow = ref({});

  watch(
    () => tasks.value,
    (newTasks, oldTasks) => {
      console.log("tasks updated to", newTasks);
    }
  );

  function isTaskSelected(cardId: string) {
    return route.params.id == cardId;
  }

  function loadTask(id: string | string[]) {
    console.log("loading task of", id);
    //// taskToShow.value = tasks.value.filter((task: ITask) => task.id === id)[0];
  }

  function selectTask(id: string) {
    console.log("selecting task of", id);
    selectedTask.value = id;
    taskToShow.value = tasks.value.filter((task: ITask) => task.id == id)[0];
    console.log("from[selectTask()]", taskToShow.value);
  }

  async function getAllTasks() {
    // fetch all tasks and update state of tasks
    try {
      isLoading.value = true;
      const fetchedTasks = await axios.get("v1/task");
      console.log("fetchedTasks", fetchedTasks);
      tasks.value = fetchedTasks?.data?.data;
    } catch (error) {
      toaster.error("Could not fetch tasks");
    } finally {
      isLoading.value = false;
    }
  }
  async function createTask(task: ITask) {
    try {
      isLoading.value = true;
      const response = await axios.post("v1/task", task);
      toaster.succes("New task created");
      console.log("[Create:Task]", response);
    } catch (error) {
      console.log("error is", error);
      toaster.error("Error creating new task");
    } finally {
      isLoading.value = false;
    }
  }
  async function updateTask(id: string) {}
  async function deleteTask(id: string, cb: () => void) {
    // delete a task here.
    try {
      isLoading.value = true;
      await axios.delete(`v1/task/${id}`);
      toaster.success("Task deleted successfully");
      cb();
    } catch (error) {
      toaster.error("Task could not be deleted");
    } finally {
      isLoading.value = false;
    }
  }

  return {
    tasks,
    taskToShow,
    isTaskSelected,
    loadTask,
    selectTask,
    selectedTask,
    isLoading,
    errors,
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
  };
});
