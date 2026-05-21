<script lang="ts" setup>
  import { AWARDS, EDUCATION, WORK_EXPERIENCE } from "~/data/experience";

  const awards = ref(AWARDS);
  const educations = ref(
    [...EDUCATION].sort((a, b) => {
      if (!a.endDate && !b.endDate) return 0;
      if (!a.endDate) return -1;
      if (!b.endDate) return 1;
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    }),
  );

  const workExperience = ref(
    [...WORK_EXPERIENCE].sort((a, b) => {
      if (!a.endDate && !b.endDate) return 0;
      if (!a.endDate) return -1;
      if (!b.endDate) return 1;
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    }),
  );

  const openWorkDropdown = ref<number | null>(null);
  const openEducationDropdown = ref<number | null>(null);
  const toggleWorkDropdown = (id: number) => {
    openWorkDropdown.value = openWorkDropdown.value === id ? null : id;
  };
  const toggleEducationDropdown = (id: number) => {
    openEducationDropdown.value =
      openEducationDropdown.value === id ? null : id;
  };
</script>

<template>
  <section class="space-y-6 pr-4">
    <!-- Work Experience -->
    <section class="space-y-2">
      <h2 class="py-1 flex justify-between items-center">
        <p
          class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
        >
          Work Experience
        </p>
        <a
          class="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline transition-colors"
          target="_blank"
          href="/docs/Madukoma Blessed Resume.pdf"
        >
          CV/Resume
        </a>
      </h2>

      <div
        v-for="(experience, id) in workExperience"
        :key="id"
        class="border-b border-zinc-200 last:border-b-0 dark:border-zinc-700"
        @click="toggleWorkDropdown(id)"
      >
        <div
          class="flex items-start space-x-3 py-2 tracking-wide group cursor-pointer"
        >
          <div class="pr-2 pl-1 flex space-x-4 flex-1">
            <ui-img :alt="experience.company" :img-url="experience.imageURL" />

            <div class="space-y-1 md:space-y-0 flex-1">
              <div class="md:flex justify-between items-center">
                <h3 class="font-semibold text-sm md:text-base">
                  <p
                    class="text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 flex items-center space-x-2"
                  >
                    {{ experience.position }}
                    <IconsArrow />
                  </p>
                </h3>
                <p
                  class="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap italic"
                >
                  {{ experience.startDate }} —
                  {{ experience.endDate ? experience.endDate : "Present" }}
                </p>
              </div>
              <p
                class="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 !mt-0"
              >
                <a
                  :href="experience.link"
                  target="_blank"
                  rel="noopener"
                  class="group-hover:underline group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                  @click.stop
                >
                  {{ experience.company }}
                </a>
              </p>
            </div>
          </div>
        </div>

        <Transition name="expand">
          <div
            v-if="openWorkDropdown === id"
            class="w-full my-2 bg-zinc-50 dark:bg-zinc-800 rounded-md px-3 pb-3"
          >
            <ul
              class="list-disc list-inside space-y-2 tracking-wide leading-loose py-3"
            >
              <li
                v-for="(role, idx) in experience.workRoles"
                :key="idx"
                class="sm:text-sm text-base text-zinc-600 dark:text-zinc-300"
                v-html="role"
              ></li>
            </ul>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Education -->
    <section class="space-y-3 mt-4">
      <h2 class="md:flex justify-between items-center">
        <p
          class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
        >
          Education
        </p>
      </h2>

      <div
        v-for="(education, id) in educations"
        :key="id"
        class="border-b border-zinc-200 last:border-b-0 dark:border-zinc-700"
        @click="toggleEducationDropdown(id)"
      >
        <div
          class="flex items-start space-x-3 py-2 tracking-wide group cursor-pointer"
        >
          <div class="pr-2 pl-1 flex space-x-4 flex-1">
            <ui-img
              :alt="education.institution"
              :img-url="education.imageURL"
            />
            <div class="space-y-1 md:space-y-0 flex-1">
              <div class="md:flex justify-between items-center">
                <h3 class="font-semibold text-sm md:text-base">
                  <p
                    class="text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 flex items-center space-x-2"
                  >
                    <a
                      :href="education.link"
                      target="_blank"
                      rel="noopener"
                      @click.stop
                      >{{ education.institution }}</a
                    >
                    <IconsArrow />
                  </p>
                </h3>
                <p
                  class="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap italic"
                >
                  {{ education.startDate }} —
                  {{ education.endDate ? education.endDate : "Present" }}
                </p>
              </div>
              <p
                class="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 !mt-0"
              >
                {{ education.degree }}
                <span v-if="education.grade" class="text-zinc-400"
                  >· {{ education.grade }}</span
                >
              </p>
            </div>
          </div>
        </div>

        <Transition name="expand">
          <div
            v-if="openEducationDropdown === id"
            class="w-full my-2 bg-zinc-50 dark:bg-zinc-800 rounded-md px-3 pb-3"
          >
            <ul
              class="list-disc list-inside space-y-2 tracking-wide leading-loose py-3"
            >
              <div
                v-if="education.thesis"
                class="sm:text-sm text-base text-zinc-600 dark:text-zinc-300"
              >
                <strong>Thesis: </strong>
                <span v-html="education.thesis"></span>
              </div>
              <li
                v-for="(item, index) in education.description"
                :key="index"
                class="sm:text-sm text-base text-zinc-600 dark:text-zinc-300"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Awards -->
    <!-- <section v-if="awards.length" class="space-y-3 mt-4">
      <h2 class="md:flex justify-between items-center">
        <p
          class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
        >
          Awards
        </p>
      </h2>

      <div
        v-for="(award, id) in awards"
        :key="id"
        class="border-b border-zinc-200 last:border-b-0 dark:border-zinc-700"
        @click="toggleAwardDropdown(id)"
      >
        <div
          class="flex flex-1 justify-between items-start space-x-3 py-2 tracking-wide group cursor-pointer"
        >
          <div class="pl-1 pr-2 flex space-x-4">
            <img
              :src="award.imageURL"
              alt="Institution logo"
              class="w-16 h-16 rounded-md object-contain"
            />
            <div class="space-y-2">
              <h3 class="font-semibold text-sm md:text-base">
                <p
                  class="group-hover:underline text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 flex items-center space-x-2"
                >
                  <a
                    :href="award.link"
                    target="_blank"
                    rel="noopener"
                    @click.stop
                  >
                    {{ award.institution }}
                  </a>
                  <IconsArrow />
                </p>
              </h3>
              <p
                class="block text-xs md:text-sm text-zinc-500 dark:text-zinc-400"
              >
                <span>{{ award.degree }}</span>
                <span v-if="award.grade">
                  <span class="text-zinc-400 mx-1">•</span>
                  {{ award.grade }}
                </span>
              </p>
            </div>
          </div>
          <p
            class="block text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap"
          >
            {{ award.startDate }} —
            {{ award.endDate ? award.endDate : "Present" }}
          </p>
        </div>

        <Transition name="expand">
          <div
            v-if="openEducationDropdown === id"
            class="w-full my-2 rounded-md p-3 tracking-wide text-sm text-zinc-600 dark:text-zinc-300"
          >
            <span>{{ award.description }}</span>
            <span v-if="award.thesis" class="block mt-2">
              <strong>Thesis: </strong>
              <span v-html="award.thesis"></span>
            </span>
          </div>
        </Transition>
      </div>
    </section> -->
  </section>
</template>
