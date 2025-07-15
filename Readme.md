# Welcome to the Codeminer42 - Gilded Rose

## The Gilded Rose Original Challenge
- https://gist.github.com/talyssonoc/77cfd627990b77db5c283f17e1d6eddb

## Run and Test

### For docker users

```bash
# Running tests
$ docker compose run --rm test

# Run and watch main code
$ docker-compose up app
```
### For local users

```bash
node version: v22.14.0

# Install dependencies
$ npm install

# Run and watch main code
$ npm start

# Testing
$ npm test
```

### Output
<img width="1104" height="981" alt="image" src="https://github.com/user-attachments/assets/59fa2568-cadb-45d4-a246-e98848c93f8d" />


## Instructions
Hi and welcome to team Gilded Rose.

As you know, we are a small inn with a prime location in a prominent city ran
by a friendly innkeeper named Allison.  We also buy and sell only the finest
goods. Unfortunately, our goods are constantly degrading in quality as they
approach their sell by date.

We have a system in place that updates our inventory for us. It was developed
by a no-nonsense type named Leeroy, who has moved on to new adventures. Your
task is to add the new feature to our system so that we can begin selling a
new category of items.

First an introduction to our system:

  - All items have a `sellIn` value which denotes the number of days we have to
    sell the item

  - All items have a `quality` value which denotes how valuable the item is

  - At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:

  - Once the `sellIn` days is less than zero, `quality` degrades twice as fast

  - The `quality` of an item is never negative

  - "Aged Brie" actually increases in `quality` the older it gets

  - The `quality` of an item is never more than 50

  - "Sulfuras", being a legendary item, never has to be sold nor does it
    decrease in `quality`

  - "Backstage passes", like aged brie, increases in `quality` as it's `sellIn`
    value decreases; `quality` increases by 2 when there are 10 days or less
    and by 3 when there are 5 days or less but `quality` drops to 0 after the
    concert

We have recently signed a supplier of conjured items. This requires an update
to our system:

  - "Conjured" items degrade in `quality` twice as fast as normal items

Feel free to make any changes to the `updateQuality` method and add any new
code as long as everything still works correctly. However, **do not alter the
`Item` class or `items` property** as those belong to the goblin in the corner
who will insta-rage and one-shot you as he doesn't believe in shared code
ownership.

Just for clarification, an item can never have its `quality` increase above 50,
however "Sulfuras" is a legendary item and as such its `quality` is 80 and it
never alters.

### 2-original-code.ts
```typescript
export class Item {
  constructor(public name: string, public sellIn: number, public quality: number) {}
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
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
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
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
                                         
const items: Array<Item> = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));
    
const gildedRose = new GildedRose(items);

gildedRose.updateQuality();
```
