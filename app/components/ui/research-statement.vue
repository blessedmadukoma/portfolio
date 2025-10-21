<script setup lang="ts">
  const emit = defineEmits(["close"]);
</script>

<template>
  <teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div
        class="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg px-10 py-4 max-w-3xl w-full text-sm"
      >
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">
            Research & Engineering Focus
          </h2>
          <button
            @click="emit('close')"
            class="text-3xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 ml-4"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <p class="text-gray-800 dark:text-gray-300 mb-3">
          I design and study
          <strong>intelligent data and machine learning systems</strong>
          that are transparent, reliable, and capable of operating in real time.
          My focus lies in understanding how
          <strong>system architecture</strong>, rather than model complexity
          alone, can make AI infrastructures inherently
          <strong>interpretable, auditable, and scalable</strong> for
          high-stakes decision environments such as sports integrity,
          compliance, and intelligent infrastructure governance.
        </p>

        <div class="mb-6">
          <h3
            class="text-base tracking-wide font-semibold text-gray-800 dark:text-gray-200 mb-1"
          >
            Current Research
          </h3>
          <p class="text-gray-800 dark:text-gray-300">
            At
            <a
              href="https://www.africa.engineering.cmu.edu/"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              Carnegie Mellon University Africa</a
            >, my current research investigates
            <strong
              >anomaly detection methodologies for athletic performance
              analysis</strong
            >
            as a pathway toward automated doping detection. I explore how
            <strong>statistical outlier detection</strong> and
            <strong>machine learning methods</strong> can identify suspicious
            performance deviations while ensuring interpretability,
            reproducibility, and fairness—building systems where detection is
            both scientifically grounded and ethically defensible.
          </p>

          <h3
            class="text-base tracking-wide font-semibold text-gray-800 dark:text-gray-200 mb-1 mt-4"
          >
            Future Direction
          </h3>
          <p class="text-gray-800 dark:text-gray-300 mb-2">
            Building on this foundation, I aim to develop
            <strong>next-generation data intelligence systems</strong>

            that unify analytics, modeling, provenance, and compliance into
            self-regulating architectures. This vision is embodied in my work
            with
            <a
              href="https://www.sedge.app/"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
            >Sedge</a>
            — a platform integrating five components: Spark, Architect, Nexus,
            Chronicle, and Guardian — to operationalize reliable, interpretable,
            and continuously adaptive AI ecosystems.
          </p>

          <p
            class="italic text-indigo-700 dark:text-indigo-300 font-medium mt-4"
          >
            My long-term question:
          </p>
          <blockquote
            class="border-l-4 border-indigo-400 pl-4 mt-2 text-gray-800 dark:text-gray-100 italic"
          >
            How can we engineer AI systems that understand, govern, and improve
            themselves — turning data infrastructures into self-reliable,
            interpretable, and continuously learning ecosystems?
          </blockquote>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped></style>
