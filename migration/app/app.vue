<template>
  <!-- Changed: Added min-h-screen flex flex-col to make flexbox container -->
  <main class="h-screen flex flex-col overflow-hidden py-4 space-y-10">
    <section>
      <Hero />
    </section>

    <section>
      <div class="p-4 bg-green-100 dark:bg-green-800">
        <h2 class="text-2xl font-bold">Intro</h2>
        <p>Introduction content here</p>
      </div>
      <div class="p-8 bg-yellow-100 dark:bg-yellow-800">
        <h3 class="text-xl font-bold">Icons</h3>
        <p>Icons content here</p>
      </div>
    </section>

    <section class="flex-grow overflow-auto">
      <div class="p-8 bg-purple-100 dark:bg-purple-800">
        <h2 class="text-2xl font-bold">Navbar & their results</h2>
        <p>Main content that can expand to fill available space</p>
      </div>
    </section>

    <section class="mt-auto">
      <Footer />
    </section>
  </main>
</template>
