export interface DragDropItem {
  id: string;
  text: string;
}

export interface DragDropTarget {
  id: string;
  label: string;
  correctItemId: string;
}

export function shuffleDragDropLayout<TItem extends DragDropItem, TTarget extends DragDropTarget>(
  items: TItem[],
  targets: TTarget[],
  random: () => number = Math.random,
) {
  const shuffledItems = [...items];
  const shuffledTargets = [...targets];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffledItems[index], shuffledItems[swapIndex]] = [shuffledItems[swapIndex], shuffledItems[index]];
  }

  for (let index = shuffledTargets.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffledTargets[index], shuffledTargets[swapIndex]] = [shuffledTargets[swapIndex], shuffledTargets[index]];
  }

  return { items: shuffledItems, targets: shuffledTargets };
}
