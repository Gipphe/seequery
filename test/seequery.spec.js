/* eslint import/no-duplicates: 0 */
import test from 'ava';
import { select, SELECT, from, FROM } from '../src/seequery';
import seequery from '../src/seequery';

const makeTitle = s => (a => `${s} :: ${a}`);
const selectPre = makeTitle('SELECT');

test(selectPre`default export and select should be the same function`, (t) => {
	t.deepEqual(seequery, select);
});
test(selectPre`select and SELECT should be the same function`, (t) => {
	t.deepEqual(select, SELECT);
});
test(selectPre`should throw when passed an array`, (t) => {
	t.throws(() => select(['this is not valid']));
});
test(selectPre`should throw when passed a boolean`, (t) => {
	t.throws(() => select(true));
	t.throws(() => select(false));
});
test(selectPre`should throw when passed an object`, (t) => {
	t.throws(() => select({}));
	t.throws(() => select({ a: 'string' }));
});
test(selectPre`should throw when passed NaN`, (t) => {
	t.throws(() => select(NaN));
});
test(selectPre`should throw when passed a function`, (t) => {
	t.throws(() => select(() => {}));
	t.throws(() => select(function foo() {})); // eslint-disable-line
});
test(selectPre`should return a seequery object on valid select query`, (t) => {
	t.is(select('Foo').sq, 'sq');
});
test(selectPre`should return a seequery object with no arguments`, (t) => {
	t.is(select().sq, 'sq');
});
test(selectPre`should save requested single key`, (t) => {
	const sql = select('foo');
	t.deepEqual(sql.selectedKeys, ['foo']);
});
test(selectPre`should noop, and only return a chainable instance, when passed no arguments`, (t) => {
	const sql = select();
	t.is(sql.sq, 'sq');
	t.is(sql.selectedKeys.length, 0);
});
test(selectPre`should accept keys with spaces`, (t) => {
	const sql = select('foo bar');
	t.deepEqual(sql.selectedKeys, ['foo bar']);
});
test(selectPre`should accept keys with dashes`, (t) => {
	const sql = select('foo-bar');
	t.deepEqual(sql.selectedKeys, ['foo-bar']);
});
test(selectPre`should add new keys to collection on subsequent calls`, (t) => {
	const sql = select('foo').select('bar');
	t.deepEqual(sql.selectedKeys, ['foo', 'bar']);
});
test(selectPre`should add new keys en masse when looping as well`, (t) => {
	const sql = select('start');
	for (let i = 0; i < 10; i += 1) {
		sql.select(i);
	}
	t.deepEqual(sql.selectedKeys, [
		'start', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
	]);
});

const fromPre = makeTitle('FROM');

test(fromPre`from and FROM should be the same function`, (t) => {
	t.deepEqual(from, FROM);
});
test(fromPre`should throw when passed a boolean`, (t) => {
	t.throws(() => from(true));
	t.throws(() => from(false));
});
test(fromPre`should throw when passed an object`, (t) => {
	t.throws(() => from({}));
	t.throws(() => from({ a: 'string' }));
});
test(fromPre`should throw when passed a number`, (t) => {
	t.throws(() => from(23));
	t.throws(() => from(-23));
	t.throws(() => from(0));
	t.throws(() => from(Infinity));
	t.throws(() => from(-Infinity));
});
test(fromPre`should throw when passed NaN`, (t) => {
	t.throws(() => from(NaN));
});
test(fromPre`should throw when passed a function`, (t) => {
	t.throws(() => from(() => {}));
	t.throws(() => from(function foo() {})); // eslint-disable-line
});
test(fromPre`should throw when passed a one-dimensional array`, (t) => {
	t.throws(() => from(['this is not valid']));
});
test(fromPre`should throw when passed a two-dimensional non-uniform array`, (t) => {
	t.throws(() => from([['foo', 'bar'], [1, 2]]));
});
test(fromPre`should throw when passed an array with objects that do not have the same keys`, (t) => {
	t.throws(() => from([{ foo: 'bar' }, { quux: 'bar' }]));
});
test(fromPre`should throw when passed an array with objects that have differing types behind identical keys`, (t) => {
	t.throws(() => from([{ foo: 'bar' }, { foo: 2 }]));
});
test(fromPre`should accept two-dimensional arrays`, (t) => {
	const arr = [[1, 2, 3], [4, 5, 6]];
	const sql = from(arr);
	t.deepEqual(sql.tables[0], arr);
});
test(fromPre`should accept arrays with object rows`, (t) => {
	const arr = [
		{
			foo: 'bar',
		},
		{
			foo: 'baz',
		},
	];
	const sql = from(arr);
	t.deepEqual(sql.tables[0], arr);
});
