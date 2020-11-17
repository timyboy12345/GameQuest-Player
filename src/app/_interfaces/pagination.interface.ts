/* tslint:disable:variable-name */
export class Pagination<T> {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [
    {
      url: string;
      label: string;
      active: boolean
    },
    {
      url: string;
      label: number;
      active: boolean
    },
    {
      url: string;
      label: string;
      active: boolean
    }
  ];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;

  data: T[];
}
