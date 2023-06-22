<template>
  <section class="flex flex-col rounded-md border border-green-200 w-full">
    <div class="flex px-4 gap-10 py-4">
      <TaskCardHeader
        :id="task?.id"
        :due_date="task?.due_date"
        :title="task?.title"
        source="task-details"
      />
    </div>
    <section class="bg-green-100 px-6 py-4 flex flex-col gap-2 text-gray-300">
      <p class="leading-8 pb-4 text-sm 2xl:text-base">{{ task?.details }}</p>
      <TaskResource
        type="mentor-managers"
        text="Mentor Managers assigned to this program"
        count="20"
        unread="20"
      />
      <TaskResource
        type="mentor"
        text="Mentors assigned to this program"
        count="56"
        unread="90"
      />
      <TaskResource
        type="reports"
        text="Task reports"
        count="40"
        unread="988"
      />
    </section>
    <section class="flex justify-end pr-6 gap-2 items-center py-6">
      <GhostBtn title="Delete" :onclick="() => onDeleteTask(task.id)">
        <IconDelete />
      </GhostBtn>
      <router-link to="edit">
        <PrimaryBtn title="Edit Task" />
      </router-link>
    </section>
  </section>
  <!-- <section v-else class="flex flex-col rounded-md border border-green-200 w-full h-96 items-center justify-center">
    <h2 class="text-xl font-semibold">No Task Selected</h2>
    <p class="text-gray-300 text-sm">Select a task to preview</p>
  </section> -->
</template>

<!-- <script lang="ts">
export default {
  data() {
    return {};
  },
  created() {},
};
</script> -->

<script setup lang="ts">
import { ref, watch, watchEffect, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import GhostBtn from "../Buttons/GhostBtn.vue";
import PrimaryBtn from "../Buttons/PrimaryBtn.vue";
import TaskCardHeader from "./TaskCardHeader.vue";
import TaskResource from "./TaskResource.vue";
import { IconDelete } from "../Icons";
import { useTasksStore } from "@/store/tasks";
import { storeToRefs } from "pinia";

const tasksStore = storeToRefs(useTasksStore());
const route = useRoute();
const task = tasksStore.taskToShow;

type Props = {
  openModal: () => void;
  closeModal: () => void;
  refreshList: (cb?: () => {}) => void;
};

const props = defineProps<Props>();

watch(
  () => tasksStore.selectedTask,
  (newTask, oldTask) => {
    console.log("selectedTask[TaskDetails] has changed");
  }
);

watch(
  () => route.params.id,
  (newVal, oldVal) => {
    console.log("route value changing", newVal, "(old)", oldVal);
    console.log("current task", task);
    tasksStore.loadTask(newVal);
  }
);

computed(() => {
  console.log("something is changing");
  return tasksStore.taskToShow;
});

watchEffect(() => console.log("task changes", tasksStore.taskToShow));

console.log("task[TaskDetails.js]", task);

const onDeleteTask = (id: string) => {
  tasksStore.deleteTask(id, props.openModal);
  props.refreshList();
};

onMounted(() => {
  console.log("task details--mounted");
  tasksStore.loadTask(route.params.id);
});
</script>
