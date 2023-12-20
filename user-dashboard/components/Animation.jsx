export const menuAnimation = (i) => {
  return {
    variants: {
      hidden: { opacity: 0, x: 0 * i },
      visible: { opacity: 1, x: 0, scale: 1.4 },
    },
    initial: 'hidden',
    animate: 'visible',
    transition: { duration: 1, delay: 0.6 * i },
  }
}
