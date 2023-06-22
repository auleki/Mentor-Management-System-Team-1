<template>
  <section
    class="flex flex-col h-[80vh] task_list gap-2 overflow-y-auto overflow-x-hidden"
  >
    <TaskCard
      v-if="tasks.length"
      v-for="task in tasks"
      :onClick="() => selectTask(task.id)"
      :key="task.id"
      :id="String(task.id)"
      :is-selected="task.id === selectedTask"
      :title="task.title"
      :details="task.details"
      :dueDate="task.due_date"
    />
    <section v-else-if="isLoading" class="flex items-center">
      <hollow-dots-spinner size="70" color="#058B94"></hollow-dots-spinner>
    </section>
    <section v-else>
      <h2 class="text-xl text-center">No Tasks</h2>
      <p class="text-center text-gray-300">You can easily create a task</p>
    </section>
  </section>
</template>

<script setup lang="ts">
import { HollowDotsSpinner } from "epic-spinners";
import TaskCard from "./TaskCard.vue";
import { useTasksStore } from "@/store/tasks";

const ts = useTasksStore();

const { selectTask, tasks, isLoading, selectedTask } = ts;
</script>
