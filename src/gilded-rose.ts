export class Item {
  constructor(public name: string, public sellIn: number, public quality: number) { }
}

export interface ItemUpdater {
  isApplicable(item: Item): boolean;
  update(item: Item): Item;
}

export class AgedBrieUpdater implements ItemUpdater {
  isApplicable(item: Item): boolean {
    return item.name === 'Aged Brie';
  }

  update(item: Item): Item {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
    item.sellIn--;

    return item;
  }
}

export class BackstagePassesUpdater implements ItemUpdater {
  isApplicable(item: Item): boolean {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert'
  }

  update(item: Item): Item {
    if (item.sellIn > 0 && item.quality < 50) {
      if (item.sellIn < 6) {
        item.quality = item.quality + 3;
      } else if (item.sellIn < 11) {
        item.quality = item.quality + 2;
      } else {
        item.quality++;
      }
      if (item.quality > 50) {
        item.quality = 50;
      }
    } else {
      item.quality = 0;
    }

    item.sellIn--;

    return item;
  }
}

// "Sulfuras", being a legendary item, never has to be sold nor does it decrease in quality
// Just for clarification, an item can never have its quality increase above 50, however "Sulfuras" is a legendary item and as such its quality is 80 and it never alters.
// Since it never should be souldier so it do not alters the sellIn
export class SufurasUpdater implements ItemUpdater {
  isApplicable(item: Item): boolean {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  update(item: Item): Item {
    item.quality = 80;

    return item;
  }
}

export class ConjuredUpdater implements ItemUpdater {
  isApplicable(item: Item): boolean {
    return item.name.toLowerCase().includes('conjured');
  }

  update(item: Item): Item {
    item.quality = item.quality - 2;

    if (item.sellIn < 0) {
      item.quality = item.quality - 2;
    }

    if (item.quality === 0) {
      item.quality = 0;
    }
    item.sellIn--;

    return item;
  }
}

export class GildedRose {
  items: Array<Item>;
  private updaters: Array<ItemUpdater>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.updaters = [
      new AgedBrieUpdater(),
      new BackstagePassesUpdater(),
      new SufurasUpdater(),
      new ConjuredUpdater()
    ];
  }

  updateQuality() {
    this.items.forEach(item => {
      const updater = this.updaters.find(updater => {
        return updater.isApplicable(item);
      });

      if (updater) {
        updater.update(item);
      } else {
        if (item.quality > 0) {
          item.quality--;
          if (item.sellIn < 0 && item.quality > 0) {
            item.quality--;
          }
        }
        item.sellIn--;
      }
    })

    return this.items;
  }
}
