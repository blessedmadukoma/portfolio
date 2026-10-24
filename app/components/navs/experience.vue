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
  const openAwardDropdown = ref<number | null>(null);
  const certificateModal = ref<string | null>(null);

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
  const hostOf = (url: string) => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  };
  const linkText = (item: { link?: string; linkLabel?: string }) =>
    item.linkLabel || (item.link ? hostOf(item.link) : "");
  const openCertificate = (url: string) => {
    certificateModal.value = url;
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
        <span class="flex items-center gap-3 text-xs">
          <a
            class="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline transition-colors"
            target="_blank"
            rel="noopener"
            href="/docs/Madukoma Blessed Resume.pdf"
            title="Resume for industry roles"
          >
            Resume
          </a>
          <a
            class="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline transition-colors"
            target="_blank"
            rel="noopener"
            href="/docs/Madukoma Blessed Academic CV.pdf"
            title="Academic CV for PhD and research positions"
          >
            Academic CV
          </a>
        </span>
      </h2>

      <div
        v-for="(experience, id) in workExperience"
        :key="id"
        class="border-b border-zinc-200 last:border-b-0 dark:border-zinc-700"
        @click="toggleWorkDropdown(id)"
      >
        <div
          class="flex items-start space-x-3 py-2 tracking-wide group cursor-pointer"
          role="button"
          tabindex="0"
          :aria-expanded="openWorkDropdown === id"
          @keydown.enter.prevent="toggleWorkDropdown(id)"
          @keydown.space.prevent="toggleWorkDropdown(id)"
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
                    <IconsArrow :open="openWorkDropdown === id" />
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
                {{ experience.company }}
              </p>
            </div>
          </div>
        </div>

        <Transition name="accordion">
          <div
            v-if="openWorkDropdown === id"
            class="grid"
          >
            <div class="min-h-0 overflow-hidden">
              <div
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
                <a
                  v-if="experience.link"
                  :href="experience.link"
                  target="_blank"
                  rel="noopener"
                  class="link-out mt-1 inline-flex items-center gap-1.5 rounded-sm py-1 text-sm font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-400 dark:decoration-blue-400/30 dark:hover:text-blue-300 dark:focus-visible:ring-offset-zinc-800"
                  @click.stop
                >
                  Visit {{ linkText(experience) }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Zm7.25-.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 1 1-1.06-1.06l5.22-5.22h-1.69a.75.75 0 0 1-.75-.75Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
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
          role="button"
          tabindex="0"
          :aria-expanded="openEducationDropdown === id"
          @keydown.enter.prevent="toggleEducationDropdown(id)"
          @keydown.space.prevent="toggleEducationDropdown(id)"
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
                    {{ education.institution }}
                    <IconsArrow :open="openEducationDropdown === id" />
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

        <Transition name="accordion">
          <div
            v-if="openEducationDropdown === id"
            class="grid"
          >
            <div class="min-h-0 overflow-hidden">
              <div
                class="w-full my-2 bg-zinc-50 dark:bg-zinc-800 rounded-md px-3 pb-3"
              >
                <ul
                  class="list-disc list-inside space-y-2 tracking-wide leading-loose py-3"
                >
                  <li
                    v-if="education.thesis"
                    class="list-none sm:text-sm text-base text-zinc-600 dark:text-zinc-300"
                  >
                    <strong>Thesis: </strong>
                    <span v-html="education.thesis"></span>
                  </li>
                  <li
                    v-for="(item, index) in education.description"
                    :key="index"
                    class="sm:text-sm text-base text-zinc-600 dark:text-zinc-300"
                  >
                    {{ item }}
                  </li>
                </ul>
                <a
                  v-if="education.link"
                  :href="education.link"
                  target="_blank"
                  rel="noopener"
                  class="link-out mt-1 inline-flex items-center gap-1.5 rounded-sm py-1 text-sm font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-400 dark:decoration-blue-400/30 dark:hover:text-blue-300 dark:focus-visible:ring-offset-zinc-800"
                  @click.stop
                >
                  Visit {{ linkText(education) }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Zm7.25-.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 1 1-1.06-1.06l5.22-5.22h-1.69a.75.75 0 0 1-.75-.75Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Awards -->
    <section v-if="awards.length" class="space-y-3 mt-4">
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
            <ui-img :alt="award.organization" :img-url="award.imageURL" />
            <div class="space-y-1 md:space-y-0">
              <h3 class="font-semibold text-sm md:text-base">
                <p
                  class="text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 flex items-center space-x-2"
                >
                  {{ award.title }}
                  <IconsArrow :open="openAwardDropdown === id" />
                </p>
              </h3>
              <p class="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
                {{ award.organization }}
              </p>
            </div>
          </div>
          <p
            class="block text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap italic"
          >
            {{ award.date }}
          </p>
        </div>

        <Transition name="accordion">
          <div
            v-if="openAwardDropdown === id"
            class="grid"
          >
            <div class="min-h-0 overflow-hidden">
              <div
                class="w-full my-2 bg-zinc-50 dark:bg-zinc-800 rounded-md px-3 pb-3"
              >
                <p class="text-sm text-zinc-600 dark:text-zinc-300 py-3">
                  {{ award.description }}
                </p>
                <div class="flex flex-wrap items-center gap-x-5 gap-y-1">
                  <a
                    v-if="award.link"
                    :href="award.link"
                    target="_blank"
                    rel="noopener"
                    class="link-out mt-1 inline-flex items-center gap-1.5 rounded-sm py-1 text-sm font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-400 dark:decoration-blue-400/30 dark:hover:text-blue-300 dark:focus-visible:ring-offset-zinc-800"
                    @click.stop
                  >
                    View paper
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Zm7.25-.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 1 1-1.06-1.06l5.22-5.22h-1.69a.75.75 0 0 1-.75-.75Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                    <span class="sr-only">(opens in a new tab)</span>
                  </a>
                  <button
                    v-if="award.certificateURL"
                    type="button"
                    class="link-out mt-1 inline-flex items-center gap-1.5 rounded-sm py-1 text-sm font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-400 dark:decoration-blue-400/30 dark:hover:text-blue-300 dark:focus-visible:ring-offset-zinc-800"
                    @click.stop="openCertificate(award.certificateURL)"
                  >
                    View certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>
  </section>

  <ui-image-modal
    v-if="certificateModal"
    :src="certificateModal"
    alt="Certificate"
    @close="certificateModal = null"
  />
</template>
