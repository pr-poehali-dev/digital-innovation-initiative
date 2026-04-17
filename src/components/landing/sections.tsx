import type { Section } from "@/types"

export const sections: Section[] = [
  {
    id: 'hero',
    variant: 'hero',
    title: 'VILMORT',
    subtitle: 'Монтаж, который продаёт',
  },
  {
    id: 'problem',
    variant: 'problem',
    title: 'Твои видео выглядят дёшево?',
    content: 'Нет заявок. Не растут просмотры. Контент сливается с тысячами других роликов — и алгоритм тебя не замечает.',
  },
  {
    id: 'solution',
    variant: 'solution',
    title: 'Монтаж, который работает на тебя.',
    content: 'Мы не просто режем и склеиваем. Мы выстраиваем структуру, темп и визуальный язык, который удерживает зрителя и превращает просмотры в клиентов.',
  },
  {
    id: 'results',
    variant: 'results',
    title: 'Наши результаты.',
    content: '',
  },
  {
    id: 'before-after',
    variant: 'before-after',
    title: 'БЫЛО — СТАЛО',
    content: '',
  },
  {
    id: 'portfolio',
    variant: 'portfolio',
    title: 'Уровень нашего монтажа.',
    content: '',
  },
  {
    id: 'testimonials',
    variant: 'testimonials',
    title: 'Что говорят клиенты.',
    content: '',
  },
  {
    id: 'benefits',
    variant: 'benefits',
    title: 'Что вы получаете?',
    content: '',
  },
  {
    id: 'process',
    variant: 'process',
    title: 'Как мы работаем.',
    content: '',
  },
  {
    id: 'cta',
    variant: 'cta',
    title: 'Готов к мощному контенту?',
    content: 'Оставь заявку — расскажем о задачах, подберём формат и стартуем в течение 2 дней.',
    showButton: true,
    buttonText: 'ЗАКАЗАТЬ МОНТАЖ',
    buttonHref: 'https://t.me/ViIlmort',
  },
]