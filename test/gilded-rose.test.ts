import { GildedRose, Item } from '../src/gilded-rose';

describe('GildedRose', () => {
  describe('updateQuality', () => {

    it('not allows quality to go negative', () => {
      const item = new Item('+5 Dexterity Vest', 5, 0);
      const shop = new GildedRose([item]);
      shop.updateQuality();
      expect(item.quality).toBe(0);
    });

    it('not increases quality beyond 50', () => {
      const item = new Item('Aged Brie', 5, 50);
      const shop = new GildedRose([item]);
      shop.updateQuality();
      expect(item.quality).toBe(50);
    });

    describe('Normal Item', () => {
      it('degrades normal item quality by 1', () => {
        const item = new Item('+5 Dexterity Vest', 10, 20);
        const shop = new GildedRose([item]);
        shop.updateQuality();
        expect(item.quality).toBe(19);
      });

      it('degrades quality twice as fast after sellIn', () => {
        const item = new Item('Elixir of the Mongoose', 0, 6);
        const shop = new GildedRose([item]);
        shop.updateQuality();
        expect(item.quality).toBe(4);
      });
    });

    describe('Aged Brie', () => {
      it('increases quality by 1 over time', () => {
        const item = new Item('Aged Brie', 2, 0);
        const shop = new GildedRose([item]);
        shop.updateQuality();
        expect(item.sellIn).toBe(1);
        expect(item.quality).toBe(1);
      });
    });

    describe('Sulfuras, Hand of Ragnaros', () => {
      it('never reduces quality of Sulfuras', () => {
        const item = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
        const shop = new GildedRose([item]);
        shop.updateQuality();
        expect(item.sellIn).toBe(0);
        expect(item.quality).toBe(80);
      });
    });

    describe('Backstage passes to a TAFKAL80ETC concert', () => {
      it('increases passes quality correctly', () => {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20);
        const shop = new GildedRose([item]);
        shop.updateQuality();
        expect(item.quality).toBe(21);
        expect(item.sellIn).toBe(10);
      });

      it('increases passes quality by 2 when sellIn <= 10', () => {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 25);
        const shop = new GildedRose([item]);
        shop.updateQuality();
        expect(item.quality).toBe(27);
      });

      it('drops quality to 0 after concert', () => {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 40);
        const shop = new GildedRose([item]);
        shop.updateQuality();
        expect(item.quality).toBe(0);
      });
    });

    describe('Conjured items', () => {
      it('degrades twice as fast', () => {
        const item = new Item('Conjured Mana Cake', 3, 6);
        const shop = new GildedRose([item]);
        shop.updateQuality();
        expect(item.quality).toBe(4);
      });

      it('degrades twice as fast after sellIn', () => {
        const item = new Item('Conjured Mana Cake', 0, 6);
        const shop = new GildedRose([item]);
        shop.updateQuality();
        expect(item.quality).toBe(3);
      });
    });

  });
});

