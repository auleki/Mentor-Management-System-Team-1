<template>
  <div className="flex gap-7 overflow-y-hidden">
    <TasksLayout />
    <div className="flex flex-col gap-2 w-full">
      <div class="flex justify-end">
        <router-link :to="{ name: 'create' }">
          <PrimaryBtn title="Create New Task" />
        </router-link>
      </div>
      <TaskDetails
        :closeModal="closeModal"
        :openModal="openModal"
        :refreshList="refreshTasksList"
      />
    </div>
    <Modal
      :isModalOpen="isModalOpen"
      primaryText="Done"
      title="Task Deleted Successfully"
      secondaryText="Undo"
      :src="deleteSuccess"
      @toggleModal="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import Modal from "@/components/Forms/Modal.vue";
import { ref, computed } from "vue";
import { deleteSuccess } from "@/assets/images";
import { HollowDotsSpinner } from "epic-spinners";
import SearchInput from "@/components/Forms/SearchInput.vue";
import Input from "@/components/Forms/Input.vue";
import GoBack from "@/assets/icons/GoBack.vue";
import { IconSearch } from "@/assets/icons";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn.vue";
import IconFilter from "@/components/Icons/IconFilter.vue";
import { useTasksStore } from "../../store/tasks";
import TaskDetails from "@/components/Tasks/TaskDetails.vue";
import type { ITask } from "@/typings/components";
import TasksLayout from "@/layouts/tasksLayout.vue";
import { onMounted } from "vue";

let isModalOpen = ref(false);
const tasksStore = useTasksStore();

let allTasks = tasksStore.getTasks && ref<{}[]>(tasksStore.getTasks);
let isLoading = ref(tasksStore.getLoadingState);
let selectedTask = ref("0");

const closeModal = () => (isModalOpen.value = false);
const openModal = () => (isModalOpen.value = true);

function refreshTasksList(cb?: () => {}) {
  tasksStore.getAllTasks();
  // close a modal
  cb && cb();
}
</script>
<style scoped lang="scss">
.task_list {
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-bg);
    height: 40px;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--btn-primary);
    opacity: 0.2;
  }
}
</style>
