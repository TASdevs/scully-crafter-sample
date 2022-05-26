export type CmsItemComponent<T> = {
  items: T[];
}

export type CmsNestedComponent<T> = CmsItemComponent<{ component: T }>
