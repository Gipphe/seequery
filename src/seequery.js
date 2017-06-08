import { seequery } from './proto';
import select from './select';
import from from './from';
import where from './where';
import commit from './commit';

seequery.select = select;
seequery.from = from;
seequery.where = where;
seequery.commit = commit;
seequery.SELECT = select;
seequery.FROM = from;
seequery.WHERE = where;
seequery.COMMIT = commit;

export {
	select,
	from,
	where,
	commit,
	select as SELECT,
	from as FROM,
	where as WHERE,
	commit as COMMIT,
};
export default select;
