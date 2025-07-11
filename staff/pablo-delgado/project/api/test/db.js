import mongoose from 'mongoose'

export default {
  async connect(url) {
    await mongoose.connect(url)
    console.log('🟢 [TEST] Connected to database')
  },
  async disconnect() {
    await mongoose.disconnect()
    console.log('🔴 [TEST] Disconnected from database')
  }
}
