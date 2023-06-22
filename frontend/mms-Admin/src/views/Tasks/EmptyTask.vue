<template>
  <div class="flex">
    <TasksLayout />
    <section
      class="flex flex-col rounded-md border border-green-200 w-full h-96 items-center justify-center"
    >
      <h2 class="text-xl font-semibold">No Task Selected</h2>
      <p class="text-gray-300 text-sm">Select a task to preview</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import TasksLayout from "@/layouts/tasksLayout.vue";
</script>
