import {redirect} from 'react-router';
import type {Route} from './+types/collections.all';

// /collections/all → redirect to /collections
export function loader(): Response {
  return redirect('/collections', 301);
}

export default function CollectionAll() {
  return null;
}
