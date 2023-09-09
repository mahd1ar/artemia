export type Session = {
          listKey: string;
          itemId: string;
          data: {
              name: string;
              createdAt: string;
          };
      }
    | undefined;