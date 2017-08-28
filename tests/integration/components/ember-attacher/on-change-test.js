import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import { click, find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ember-attacher', 'Integration | Component | onChange', {
  integration: true
});

test('fires the onChange hook when visibility is toggled', function(assert) {
  assert.expect(5);

  this.set('isShown', true);

  this.render(hbs`
    <button id="click-toggle">
      Click me, captain!

      {{#ember-attacher class='hello'
                        hideOn='click'
                        isShown=isShown
                        onChange=(action (mut isShown))
                        showOn='click'}}
        showOn click
      {{/ember-attacher}}
    </button>
  `);

  const innerAttacher = find('.hello > .inner');

  assert.equal(innerAttacher.style.display, '', 'Initially shown');

  return click(find('#click-toggle')).then(() => {
    assert.equal(innerAttacher.style.display, 'none', 'Now hidden');
    assert.equal(this.get('isShown'), false);

    // Show again by toggling isShown
    this.set('isShown', true);

    return wait().then(() => {
      assert.equal(innerAttacher.style.display, '', 'Shown again');

      // Make sure isShown is still true
      assert.equal(this.get('isShown'), true);
    });
  });
});