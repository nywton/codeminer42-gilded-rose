export class Item {
  constructor(public name: string, public sellIn: number, public quality: number) { }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const isAgedBrie = this.items[i].name === 'Aged Brie';
      const isBackstagePasses = this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert';
      const isSulfuras = this.items[i].name === 'Sulfuras, Hand of Ragnaros';
      const isConjured = this.items[i].name.toLowerCase().includes('conjured');

      if (!isAgedBrie && !isBackstagePasses && !isSulfuras) {
        if (this.items[i].quality > 0) {
          if (!isSulfuras) {
            if (isConjured) {
              this.items[i].quality -= this.items[i].quality > 1 ? 2 : this.items[i].quality;
            } else {
              this.items[i].quality = this.items[i].quality - 1;
            }
          }

        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (isBackstagePasses) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (!isSulfuras) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (!isAgedBrie) {
          if (!isBackstagePasses) {
            if (this.items[i].quality > 0) {
              if (!isSulfuras) {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = 0;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
