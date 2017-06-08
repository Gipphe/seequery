import { seequery } from './proto';
import select from './select';
import from from './from';

seequery.select = select;
seequery.from = from;

export {
	select,
	from,
	select as SELECT,
	from as FROM,
};
export default select;
