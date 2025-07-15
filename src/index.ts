import { GildedRose, Item } from './gilded-rose';

const items: Array<Item> = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

const gildedRose = new GildedRose(items);

let days: number = 2;

if (process.argv.length > 2) {
  days = Number(process.argv[2]);
}

for (let i = 0; i < days; i++) {
  console.log('\n🛒 Inventory Report Day ' + i + '\n');
  console.log('===========================');
  console.table(gildedRose.items);

  gildedRose.updateQuality();
}
