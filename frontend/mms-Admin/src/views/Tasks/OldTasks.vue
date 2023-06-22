<template>
  <div className="flex gap-7 overflow-y-hidden">
    <!-- <div className="w-[359px] overflow-x-hidden"> -->
    <section className="flex justify-between">
      <!-- Search Input -->
      <!-- <section v-if="showSearchField" class="flex items-center gap-4z w-full">
          <button @click="toggleShowSearchField" class="mb-6">
            <GoBack />
          </button>
          <div class="w-full">
            <Input placeholder="Find a task..."/>
          </div>
        </section> -->
      <!-- <div
          v-if="!showSearchField"
          class="flex justify-between pb-6 overflow-y-auto mt-4 w-full"
        > -->
      <!-- <h1 className="font-semibold text-xl 2xl:text-2xl">Tasks</h1> -->
      <!-- Search & Filter Icon -->
      <!-- <div class="flex items-center gap-2">
            <span class="cursor-pointer" @click="toggleShowSearchField">
              <IconSearch color="#058B94" />
            </span>
            <span class="cursor-pointer">
              <IconFilter />
            </span>
          </div>
        </div> -->
    </section>
    <!-- <section
        class="flex flex-col h-[80vh] task_list gap-2 overflow-y-auto overflow-x-hidden"
      >
        <TaskCard
          v-if="allTasks.length"
          v-for="task in allTasks"
          :onClick="() => selectTask(Number(task.id))"
          :key="task.id"
          :is-selected="task.id === String(selectedTask)"
          :title="task.title"
          :details="task.details"
          :dueDate="task.due_date"
        />
        <section v-else-if="isLoadingTasks" class="flex items-center">
          <hollow-dots-spinner size="70" color="#058B94"></hollow-dots-spinner>
        </section>
        <section v-else>
          <h2 class="text-xl text-center">No Tasks</h2>
          <p class="text-center text-gray-300">You can easily create a task</p>
        </section>
      </section> -->
  </div>
  <div className="flex flex-col gap-2 w-full">
    <div class="flex justify-end">
      <router-link :to="{ name: 'create' }">
        <PrimaryBtn title="Create New Task" />
      </router-link>
    </div>
    <h2>Task Details</h2>
    <p>Display task details</p>
    <!-- <TaskDetails
        :task="taskToShow"
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
    /> -->
  </div>
</template>

<script setup lang="ts">
import Modal from "@/components/Forms/Modal.vue";
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
