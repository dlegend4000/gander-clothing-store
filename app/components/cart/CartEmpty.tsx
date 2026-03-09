import {Link} from 'react-router';
import {Button} from '~/components/ui/Button';

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 px-6 text-center">
      <div className="text-5xl">🛍️</div>
      <h3 className="text-lg font-medium text-zinc-900">Your bag is empty</h3>
      <p className="text-sm text-zinc-500">
        Looks like you haven&apos;t added anything yet.
      </p>
      <Button variant="primary" size="md">
        <Link to="/collections">Start shopping</Link>
      </Button>
    </div>
  );
}
