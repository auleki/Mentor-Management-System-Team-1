<template>
  <router-link :to="'/admin/tasks/' + id">
    <div
      class="card"
      :class="isSelected ? 'selected' : null"
      :onClick="onClick"
    >
      <TaskCardHeader
        :id="id"
        :truncate="true"
        :title="title"
        :due-date="dueDate"
      />
    </div>
  </router-link>
</template>

<script setup lang="ts">
import TaskCardHeader from "./TaskCardHeader.vue";

type Props = {
  id: string;
  title: string;
  details: string;
  dueDate: string;
  isSelected: boolean;
  onClick: () => void;
};

const props = defineProps<Props>();
console.log("props from task card", props);
</script>

<style lang="scss">
.card {
  display: flex;
  cursor: pointer;
  gap: 1rem;
  width: 100%;
  padding: 12px 15px;
  border: 1px solid hsla(0, 0%, 90%, 1);
  border-radius: 5px;
  transition: 200ms border-color ease-in, background 300ms ease-out;

  &.selected {
    border-color: #058b94;
    background: var(--light-grid-background);
  }
}
</style>
