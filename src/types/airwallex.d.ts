/**
 * Type declarations for airwallex-payment-elements
 * 
 * 这些类型定义用于解决 TypeScript 编译错误
 * 因为 airwallex-payment-elements 包可能没有官方类型定义
 */

declare module 'airwallex-payment-elements' {
  // Airwallex 配置选项
  interface AirwallexConfig {
    env: 'staging' | 'production';
    origin?: string;
  }

  // Elements 创建配置
  interface ElementsConfig {
    clientId: string;
    mode: 'staging' | 'production';
    locale?: string;
    appearance?: {
      variables?: {
        colorPrimary?: string;
        colorBackground?: string;
        colorText?: string;
        borderRadius?: string;
        [key: string]: string | undefined;
      };
      [key: string]: unknown;
    };
  }

  // Drop-in Element 配置
  interface DropInConfig {
    client_secret: string;
    appearance?: {
      variables?: Record<string, string>;
      [key: string]: unknown;
    };
    payment_method_options?: {
      card?: {
        allowed_networks?: string[];
        three_ds?: {
          enabled: boolean;
        };
      };
      applepay?: {
        enabled: boolean;
      };
      googlepay?: {
        enabled: boolean;
      };
      [key: string]: unknown;
    };
    currency?: string;
    amount?: number;
  }

  // 支付成功事件数据
  interface PaymentSuccessEvent {
    payment_intent_id: string;
    status: string;
    [key: string]: unknown;
  }

  // 支付错误事件数据
  interface PaymentErrorEvent {
    error?: {
      message: string;
      code?: string;
    };
    [key: string]: unknown;
  }

  // Element 实例
  interface AirwallexElement {
    mount(container: HTMLElement | string): Promise<void>;
    on(event: 'ready', callback: () => void): void;
    on(event: 'success', callback: (event: PaymentSuccessEvent) => void): void;
    on(event: 'error', callback: (event: PaymentErrorEvent) => void): void;
    destroy(): void;
  }

  // Elements 实例
  interface AirwallexElements {
    create(type: 'dropIn', config: DropInConfig): AirwallexElement;
    create(type: string, config: unknown): AirwallexElement;
  }

  // loadAirwallex 函数
  export function loadAirwallex(config?: AirwallexConfig): Promise<void>;

  // createElements 函数
  export function createElements(config: ElementsConfig): AirwallexElements;

  // 默认导出
  const Airwallex: {
    loadAirwallex: typeof loadAirwallex;
    createElements: typeof createElements;
  };

  export default Airwallex;
}
