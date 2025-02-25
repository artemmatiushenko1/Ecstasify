import { RootStore } from '@/stores/root.store';
import CustomHttpClient from '@/lib/http-client';
import HttpRequest from '@/lib/http-request';
import AuthorsService from './authors.service';
import SubscriptionsService from './subscriptions.service';
import TracksService from './tracks.service';
import UsersService from './users.service';

export class RootService {
  usersService: UsersService;
  authorsService: AuthorsService;
  tracksService: TracksService;
  subscriptionsService: SubscriptionsService;

  constructor(rootStore: RootStore) {
    const httpRequest = new HttpRequest(
      new CustomHttpClient({ baseUrl: import.meta.env.VITE_API_URL, rootStore })
    );

    this.usersService = new UsersService(httpRequest);
    this.authorsService = new AuthorsService(httpRequest);
    this.tracksService = new TracksService(httpRequest);
    this.subscriptionsService = new SubscriptionsService(httpRequest);
  }
}
