import { Connection } from 'typeorm';

export const truncateTables = async (connection: Connection) => {
   const entities = connection.entityMetadatas;
   for (const entity of entities) {
      const repository = connection.getRepository(entity.name);
      await repository.clear();
   }
};
