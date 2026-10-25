export default defineNuxtPlugin(async () => {
  if (process.client) {
    try {
      await import('bootstrap/dist/js/bootstrap.bundle.min.js')
    } catch (e) {
      // In case bootstrap bundle fails to load
    }
  }
})
