<template>
  <div class="flex gap-6">
    <section class="w-full">
      <h1 class="font-semibold text-2xl">New Task</h1>
      <form class="mt-10 flex flex-col" @submit.prevent="createNewTask">
        <!-- Title -->
        <Input
          label="Title"
          placeholder="Enter a title"
          @update:text-input="(value: string) => (newTaskData.title = value)"
          hint="The title must contain a maximum of 32 characters"
        />
        <Textarea 
          @update:text-area-val="(value: string) => (newTaskData.details = value)" 
          placeholder="Enter task details" 
          label="Details" 
          />
        <section class="flex gap-6 mt-4 mb-8">
          <!-- Add Mentor Manager -->
          <ResourceSelector
            :on-click="() => toggleResourceList(RESOURCE_TYPE.MENTOR_MANAGERS)"
            title="Add Mentor Manager"
            :num="10"
          />
          <!-- Add Mentor -->
          <ResourceSelector
            :on-click="() => toggleResourceList(RESOURCE_TYPE.MENTORS)"
            title="Add Mentor"
            :num="6"
          />
        </section>
        <!-- Create Task button -->
        <PrimaryBtn title="Create Task" class="small" role="submit"/>
      </form>
    </section>

    <!-- Mentor or Mentor Manager selection list -->
    <ResourceList
      :resourceType="RESOURCE_TYPE.MENTORS"
      v-if="showMentorsList"
      :onClick="addToResourceList"
      :resources="mentorManagers"
      :selectedResources="selectedMentors"
    />
    <ResourceList
      :resourceType="RESOURCE_TYPE.MENTOR_MANAGERS"
      v-if="showMentorManagersList"
      :onClick="addToResourceList"
      :resources="mentorManagers"
      :selectedResources="selectedMentorManagers"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn.vue";
import ResourceSelector from "@/components/Common/ResourceSelector.vue";
import Input from "@/components/Forms/Input.vue";
import Textarea from "@/components/Forms/Textarea.vue";
import ResourceList from "@/components/Tasks/ResourceList.vue";
import {RESOURCE_TYPE} from "@/helpers/enum"
import { useTasksStore } from "@/store/tasks";

const tasksStore = useTasksStore()

let newTaskData = ref({})

const spawnDate = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)  
  return date
}

const createNewTask = () => {
  const taskPostData = {
    ...newTaskData.value,
    assignees: [...selectedMentorManagers, ...selectedMentors],
    priority: "low",
    due_date: spawnDate(6),
    status: "in_progress",
    start_date: new Date(Date.now())
  }
  tasksStore.createTask(taskPostData)
  console.log('Submitting', taskPostData) 
}

let selectedMentors: string[] = []
let selectedMentorManagers: string[] = []

const mentorManagers = [
  {
    id: 1,
    name: "Kabiru Omo Isaka",
    position: "Program Assistant",
    pronouns: ["She", "her"],
    roles: ["Program Asst", "Mentor-GADS"],
  },
  {
    id: 2,
    name: "Taofekat Municipal",
    position: "Program Assistant",
    pronouns: ["She", "her"],
    roles: ["Program Asst", "Mentor-GADS"],
  },
  {
    id: 3,
    name: "Idris Kempleton",
    position: "Program Assistant",
    pronouns: ["She", "her"],
    roles: ["Program Asst", "Mentor-GADS"],
  },
  {
    id: 4,
    name: "Paul Adefejaye",
    position: "Program Assistant",
    pronouns: ["She", "her"],
    roles: ["Program Asst", "Mentor-GADS"],
  },
];

let showMentorsList = ref(false);
let showMentorManagersList = ref(false);

const addToResourceList = (resourceId: string, resourceType: string) => {
  if (resourceType === RESOURCE_TYPE.MENTORS) {
    if (!selectedMentors.includes(resourceId)) {
      selectedMentors.push(resourceId)
    } else {
      selectedMentors = selectedMentors.filter(mentorId => mentorId === resourceId)
    }
    console.log('list of mentors', selectedMentors);
  } else if (resourceType === RESOURCE_TYPE.MENTOR_MANAGERS) {
    if (!selectedMentorManagers.includes(resourceId)) {
      selectedMentorManagers.push(resourceId)
    } else {
      selectedMentorManagers = selectedMentorManagers.filter(managerId => managerId === resourceId)
    }
    console.log('list of mentors managers', selectedMentorManagers);
  }
};

const toggleResourceList = (resourceType: string) => {
  if (resourceType === RESOURCE_TYPE.MENTORS) {
    if (showMentorManagersList.value) showMentorManagersList.value = false
    showMentorsList.value = !showMentorsList.value
    showMentorManagersList.value = showMentorManagersList.value
  } else if (resourceType === RESOURCE_TYPE.MENTOR_MANAGERS) {
    if (showMentorsList.value) showMentorsList.value = false
    showMentorManagersList.value = !showMentorManagersList.value
  }
};
</script>
