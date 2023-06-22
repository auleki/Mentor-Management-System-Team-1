<template>
  <div className="flex gap-7 overflow-y-hidden mr-4">
    <!-- <div> -->
    <div className="w-[359px] overflow-x-hidden">
      <!-- <div> -->
      <section className="flex flex-col">
        <TasksSearchInput
          :showSearchField="showSearchField"
          :toggleShowSearchField="toggleShowSearchField"
        />
        <TasksList
          :isLoadingTasks="tasksStore.isLoading"
          :allTasks="tasksStore.tasks"
          :selectedTask="tasksStore.selectedTask"
          :selectTask="tasksStore.selectTask"
        />
      </section>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import TasksSearchInput from "@/components/Tasks/TasksSearchInput.vue";
import Modal from "@/components/Forms/Modal.vue";
import { deleteSuccess } from "@/assets/images";
import { HollowDotsSpinner } from "epic-spinners";
import SearchInput from "@/components/Forms/SearchInput.vue";
import Input from "@/components/Forms/Input.vue";
import GoBack from "@/assets/icons/GoBack.vue";
import TasksList from "@/components/Tasks/TasksList.vue";
import type { ITask } from "@/typings/components";

import { useTasksStore } from "@/store/tasks";

const tasksStore = useTasksStore();

console.log("tasks[store]", tasksStore);

let showSearchField = ref(false);
let isModalOpen = ref(false);

async function loadTasks() {
  await tasksStore.getAllTasks();
}

async function refreshTasksList(cb: () => {}) {
  loadTasks();
  // close a modal
  cb();
}

const toggleShowSearchField = () =>
  (showSearchField.value = !showSearchField.value);

onMounted(() => {
  // load all tasks from API
  loadTasks();
});
</script>
