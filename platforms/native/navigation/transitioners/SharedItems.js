import React from 'react';

export type Metrics = {
  x: number,
  y: number,
  width: number,
  height: number,
};

export class SharedItem {
  name: string;
  containerRouteName: string;
  reactElement: React.Element<*>;
  nativeHandle: any;
  metrics: ?Metrics;

  constructor(
    name: string,
    containerRouteName: string,
    reactElement: React.Element<*>,
    nativeHandle: any,
    metrics: ?Metrics,
  ) {
    this.name = name;
    this.containerRouteName = containerRouteName;
    this.reactElement = reactElement;
    this.nativeHandle = nativeHandle;
    this.metrics = metrics;
  }

  scaleRelativeTo(other: SharedItem) {
    const validate = i => {
      if (!i.metrics) {
        throw new Error(`No metrics in ${i.name}:${i.containerRouteName}`);
      }
    };
    validate(this);
    validate(other);
    return {
      x: this.metrics.width / other.metrics.width,
      y: this.metrics.height / other.metrics.height,
    };
  }

  clone() {
    return new SharedItem(
      this.name,
      this.containerRouteName,
      this.reactElement,
      this.nativeHandle,
      this.metrics,
    );
  }

  toString() {
    return `${this.name} ${this.containerRouteName} ${JSON.stringify(
      this.metrics,
    )}`;
  }
}

type ItemPair = {
  fromItem: SharedItem,
  toItem: SharedItem,
};

export type UpdateRequest = {
  name: string,
  containerRouteName: string,
  metrics: ?Metrics,
};

class SharedItems {
  _items: Array<SharedItem>;

  constructor(items: Array<SharedItem> = []) {
    this._items = [...items];
  }

  _findIndex(name: string, containerRouteName: string): number {
    return this._items.findIndex(i => {
      return i.name === name && i.containerRouteName === containerRouteName;
    });
  }

  count() {
    return this._items.length;
  }

  add(item: SharedItem): SharedItems {
    if (this._findIndex(item.name, item.containerRouteName) >= 0) {
      return this;
    }

    return new SharedItems([...this._items, item]);
  }

  remove(name: string, containerRouteName: string): SharedItems {
    const index = this._findIndex(name, containerRouteName);
    if (index >= 0) {
      const newItems = [
        ...this._items.slice(0, index),
        ...this._items.slice(index + 1),
      ];
      return new SharedItems(newItems);
    }
    return this;
  }

  updateMetrics(requests: Array<UpdateRequest>): SharedItems {
    const indexedRequests = requests.map(r => ({
      ...r,
      index: this._findIndex(r.name, r.containerRouteName),
    }));

    if (indexedRequests.every(r => r.index < 0)) return this;

    const newItems = Array.from(this._items);
    indexedRequests.forEach(r => {
      if (r.index >= 0) {
        const newItem = newItems[r.index].clone();
        newItem.metrics = r.metrics;
        newItems[r.index] = newItem;
      }
    });
    return new SharedItems(newItems);
  }

  removeAllMetrics(): SharedItems {
    if (this._items.some(i => !!i.metrics)) {
      const newItems = this._items.map(item => {
        const newItem = item.clone();
        newItem.metrics = null;
        return newItem;
      });
      return new SharedItems(newItems);
    }
    return this;
  }

  _getNamePairMap(fromRoute: string, toRoute: string) {
    // TODO cache the map. Since the object is immutable, no need to worry about updates to _items
    const nameMap = this._items.reduce((map, item) => {
      let pairByName = map.get(item.name);
      if (!pairByName) {
        pairByName = {};
        map.set(item.name, pairByName);
      }
      if (item.containerRouteName === fromRoute) pairByName.fromItem = item;
      if (item.containerRouteName === toRoute) pairByName.toItem = item;
      // delete empty pairs
      if (!pairByName.fromItem && !pairByName.toItem) map.delete(item.name);
      return map;
    }, new Map());
    return nameMap;
  }

  isMeatured(p: ItemPair) {
    const isNumber = n => typeof n === 'number';
    const metricsValid = (m: Metrics) =>
      m && [m.x, m.y, m.width, m.height].every(isNumber);
    const { fromItem, toItem } = p;
    return (
      fromItem &&
      toItem &&
      metricsValid(fromItem.metrics) &&
      metricsValid(toItem.metrics)
    );
  }

  getMeasuredItemPairs(fromRoute: string, toRoute: string): Array<ItemPair> {
    const nameMap = this._getNamePairMap(fromRoute, toRoute);

    return Array.from(nameMap.values()).filter(this.isMeatured);
  }

  findMatchByName(name: string, routeToExclude: string): ?SharedItem {
    return this._items.find(
      i => i.name === name && i.containerRouteName !== routeToExclude,
    );
  }

  areMetricsReadyForAllPairs(fromRoute: string, toRoute: string): boolean {
    const nameMap = this._getNamePairMap(fromRoute, toRoute);
    return Array.from(nameMap.values()).every(this.isMeatured);
  }
}

export default SharedItems;
