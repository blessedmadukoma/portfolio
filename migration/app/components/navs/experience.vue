<script lang="ts" setup>
  import { AWARDS, EDUCATION, WORK_EXPERIENCE } from "~/data/experience";

  const awards = ref(AWARDS);
  const educations = ref(
    [...EDUCATION].sort((a, b) => {
      if (!a.endDate && !b.endDate) return 0;
      if (!a.endDate) return -1;
      if (!b.endDate) return 1;
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    })
  );

  const workExperience = ref(
    [...WORK_EXPERIENCE].sort((a, b) => {
      if (!a.endDate && !b.endDate) return 0;
      if (!a.endDate) return -1;
      if (!b.endDate) return 1;
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    })
  );

  // Separate dropdown states for each section
  const openWorkDropdown = ref<number | null>(null);
  const openEducationDropdown = ref<number | null>(null);
  const openAwardDropdown = ref<number | null>(null);

  const toggleWorkDropdown = (id: number) => {
    openWorkDropdown.value = openWorkDropdown.value === id ? null : id;
  };
  const toggleEducationDropdown = (id: number) => {
    openEducationDropdown.value =
      openEducationDropdown.value === id ? null : id;
  };
  const toggleAwardDropdown = (id: number) => {
    openAwardDropdown.value = openAwardDropdown.value === id ? null : id;
  };
</script>
<template>
  <section class="space-y-3 mt-2">
    <section class="space-y-2">
      <h2 class="text-sm tracking-wide flex justify-between items-center">
        <p class="font-bold text-lg">WORK EXPERIENCE</p>
        <a class="underline" target="_blank" href="#">View My Resume</a>
      </h2>
      <div
        v-for="(experience, id) in workExperience"
        :key="id"
        class="border-b border-gray-200 last:border-b-0 dark:border-gray-700"
        @click="toggleWorkDropdown(id)"
      >
        <div
          class="flex flex-1 justify-between items-start space-x-3 py-2 tracking-wide group cursor-pointer"
        >
          <div class="px-2 flex space-x-4">
            <img
              v-if="experience.imageURL"
              :src="experience.imageURL"
              alt="Experience Image"
              class="w-16 h-16 rounded-md"
            />

            <div v-else>
              <svg
                class="w-20 h-20 rounded-md bg-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 80"
                fill="none"
              >
                <rect width="80" height="80" rx="12" fill="#E5E7EB" />
                <text
                  x="50%"
                  y="50%"
                  text-anchor="middle"
                  dy=".3em"
                  font-size="14"
                  fill="#9CA3AF"
                >
                  No Image
                </text>
              </svg>
            </div>

            <div class="space-y-1">
              <h3 class="font-semibold">
                <p
                  class="group-hover:underline text-gray-600 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-gray-100 hover:text-gray-600 dark:hover:text-gray-100 flex justify-normal items-center space-x-2"
                >
                  <a
                    :href="experience.link"
                    target="_blank"
                    rel="noopener"
                    class=""
                    @click.stop
                  >
                    {{ experience.company }}</a
                  >
                  <span
                    class="transition-transform duration-200 group-hover:rotate-90"
                  >
                    <svg
                      class="inline w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 4l4 4-4 4"
                      />
                    </svg>
                  </span>
                </p>
              </h3>
              <p
                class="block text-sm text-gray-500 dark:text-gray-400 space-x-2"
              >
                <span>{{ experience.position }}</span>
              </p>
            </div>
          </div>
          <p class="block text-xs text-gray-500 dark:text-gray-400 space-x-2">
            {{ experience.startDate }} —
            {{ experience.endDate ? experience.endDate : "Present" }}
          </p>
        </div>
        <!-- Dropdown -->
        <Transition name="expand">
          <div
            v-if="openWorkDropdown === id"
            class="w-full my-2 bg-gray-100 dark:bg-gray-800 rounded p-3 col-span-2"
          >
            Simple dropdown text for {{ experience.company }}
          </div>
        </Transition>
      </div>
    </section>

    <section v-if="awards.length" class="space-y-3">
      <h2 class="text-sm tracking-wide flex justify-between items-center">
        <p class="font-bold text-lg">AWARDS</p>
        <a class="underline" target="_blank" href="#">View More</a>
      </h2>
      <!-- Example for awards section (uncomment and adjust as needed) -->
      <!--
      <div
        v-for="(award, id) in awards"
        :key="id"
        class="border-b border-gray-200 last:border-b-0 dark:border-gray-700"
        @click="toggleAwardDropdown(id)"
      >
        <div class="flex flex-1 justify-between items-start space-x-3 py-2 tracking-wide group cursor-pointer">
          <div class="px-2 flex space-x-4">
            <img :src="award.imageURL" alt="Award Image" class="w-16 h-16 rounded-md" />
            <div class="space-y-2">
              <h3 class="font-semibold">{{ award.title }}</h3>
              <p class="block text-sm text-gray-500 dark:text-gray-400 space-x-2">
                <span>{{ award.issuer }}</span>
              </p>
            </div>
          </div>
          <p class="block text-xs text-gray-500 dark:text-gray-400 space-x-2">
            {{ award.date }}
          </p>
        </div>
        <div
          v-if="openAwardDropdown === id"
          class="w-full my-2 bg-gray-100 dark:bg-gray-800 rounded p-3 col-span-2"
        >
          Simple dropdown text for {{ award.title }}
        </div>
      </div>
      -->
    </section>

    <section class="space-y-3 mt-4">
      <h2 class="text-sm tracking-wide flex justify-between items-center">
        <p class="font-bold text-lg">EDUCATION</p>
      </h2>
      <div
        v-for="(education, id) in educations"
        :key="id"
        class="border-b border-gray-200 last:border-b-0 dark:border-gray-700"
        @click="toggleEducationDropdown(id)"
      >
        <div
          class="flex flex-1 justify-between items-start space-x-3 py-2 tracking-wide group cursor-pointer"
        >
          <div class="px-2 flex space-x-4">
            <img
              :src="education.imageURL"
              alt="Project Image"
              class="w-16 h-16 rounded-md"
            />
            <div class="space-y-2">
              <h3 class="font-semibold">
                <p
                  class="group-hover:underline text-gray-600 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-gray-100 hover:text-gray-600 dark:hover:text-gray-100 flex justify-normal items-center space-x-2"
                >
                  <a
                    :href="education.link"
                    target="_blank"
                    rel="noopener"
                    class=""
                    @click.stop
                  >
                    {{ education.institution }}</a
                  >
                  <span
                    class="transition-transform duration-200 group-hover:rotate-90"
                  >
                    <svg
                      class="inline w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 4l4 4-4 4"
                      />
                    </svg>
                  </span>
                </p>
              </h3>
              <p
                class="block text-sm text-gray-500 dark:text-gray-400 space-x-2"
              >
                <span>{{ education.degree }}</span>
                <span v-if="education.grade">
                  <span class="text-gray-600">•</span>
                  {{ education.grade }}
                </span>
              </p>
            </div>
          </div>
          <p class="block text-xs text-gray-500 dark:text-gray-400 space-x-2">
            {{ education.startDate }} —
            {{ education.endDate ? education.endDate : "Present" }}
          </p>
        </div>
        <!-- Dropdown -->
        <Transition name="expand">
          <div
            v-if="openEducationDropdown === id"
            class="w-full my-2 bg-gray-100 dark:bg-gray-800 rounded p-3 col-span-2"
          >
            Simple dropdown text for {{ education.description }}
          </div>
        </Transition>
      </div>
    </section>
  </section>
</template>

<style scoped>
  .expand-enter-active,
  .expand-leave-active {
    transition: max-height 0.12s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s;
    overflow: hidden;
  }
  .expand-enter-from,
  .expand-leave-to {
    max-height: 0;
    opacity: 0;
  }
  .expand-enter-to,
  .expand-leave-from {
    max-height: 500px;
    opacity: 1;
  }
</style>
