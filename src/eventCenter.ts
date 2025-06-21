class EventCenter {
    private events: Record<string, Array<(...args: unknown[]) => void>> = {};
    private static instance: EventCenter = new EventCenter();
    private constructor() {
      // 确保只能通过 getInstance 方法获取实例
    }
    // 获取单例实例
    static getInstance() {
        return this.instance;
        }
    // 订阅
    on(event: string, listener: (...args: unknown[]) => void) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(listener);
    }
  
    // 取消订阅
    off(event: string, listener: (...args: unknown[]) => void) {
      if (!this.events[event]) return;
      this.events[event] = this.events[event].filter(l => l !== listener);
    }
  
    // 发布
    emit(event: string, ...args: unknown[]) {
      if (!this.events[event]) return;
      this.events[event].forEach(listener => listener(...args));
    }
  }
  const eventCenter=EventCenter.getInstance()
export default eventCenter;