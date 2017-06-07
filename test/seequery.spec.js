import test from 'ava';
import { select } from '../src/seequery';

const makeTitle = s => (a => `${s} :: ${a}`);
const selectPre = makeTitle('SELECT');

test(selectPre`should throw on invalid SELECT string`, (t) => {
	t.throws(() => select('not a \nvalid string'));
	t.throws(() => select(true));
});
test(selectPre`should return a seequery object on valid select query`, (t) => {
	t.deepEqual(select('Foo').sq, 'sq');
});
test.skip(selectPre`should throw InvalidQuery when passed an invalid query`, (t) => {
	t.plan(2);

	try {
		select('not a \n valid string');
	} catch (e) {
		t.is(e.name, 'InvalidQuery');
		t.is(e.message, 'Query contains invalid characters: not a \n valid string');
	}
});
test(selectPre`should throw if a passed query is of an invalid type`,
	(t) => {
		t.plan(2);
		try {
			select(true);
		} catch (e) {
			t.is(e.name, 'TypeError');
			t.is(e.message, 'Query is of invalid type: boolean, true');
		}
	});
test(selectPre`should save requested single key`, (t) => {
	const sql = select('foo');
	t.deepEqual(sql.selectedKeys, ['foo']);
});
test(selectPre`should noop, and only return a chainable instance, with no queries passed`, (t) => {
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
		'start', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	]);
});

const fromPre = makeTitle('FROM');

test(fromPre`should throw on being passed a non-array or non-plain object type`, (t) => {
	t.plan(2);
	try {
		select().from(true);
	} catch (e) {
		t.is(e.name, 'TypeError');
		t.is(e.message, 'Table is not a uniform two-dimensional array');
	}
});
test(fromPre`should accept two-dimensional arrays`, (t) => {
	const arr = [[1, 2, 3], ['a', 'b', 'c']];
	const sql = select().from(arr);
	t.deepEqual(sql.tables[0], [[1, 2, 3], ['a', 'b', 'c']]);
});
test(fromPre`should accept two-dimensional arrays with objects`, (t) => {
	const arr = [
		{
			foo: 'bar',
		},
		{
			foo: 'baz',
		},
	];
	const sql = select().from(arr);
	t.deepEqual(sql.tables[0], [{ foo: 'bar' }, { foo: 'baz' }]);
});
