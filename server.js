import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';
import { env } from './config/env.js';
import { createApp } from './app.js';
import { JsonRepository } from './repositories/jsonRepository.js';

const repository = new JsonRepository(env.dataFile);
await repository.init();

if (process.env.NODE_ENV !== 'production') {
  // Usuario administrador de demo
  if (!repository.findUserByEmail('admin@agrosmart.com')) {
    await repository.insert('users', {
      id: randomUUID(),
      name: 'Administrador AgroSmart',
      email: 'admin@agrosmart.com',
      passwordHash: await bcrypt.hash('Administrador2026', 12),
      role: 'Administrador'
    });
  }
  // Mantener compatibilidad con el usuario de demo anterior
  if (!repository.findUserByEmail('demo@agrosmart.com')) {
    await repository.insert('users', {
      id: randomUUID(),
      name: 'Equipo AgroSmart',
      email: 'demo@agrosmart.com',
      passwordHash: await bcrypt.hash('Administrador2026', 12),
      role: 'Administrador'
    });
  }
  // Usuario Trabajador / Operario de demo
  if (!repository.findUserByEmail('operario@agrosmart.com')) {
    await repository.insert('users', {
      id: randomUUID(),
      name: 'Carlos Ramírez',
      email: 'operario@agrosmart.com',
      passwordHash: await bcrypt.hash('Trabajador / Operario2026', 12),
      role: 'Trabajador / Operario'
    });
  }
}

const app = createApp(repository);
app.listen(env.port, () => {
  console.log(`AgroSmart API disponible en http://localhost:${env.port}/api`);
  if (process.env.NODE_ENV !== 'production') {
    console.log('  demo admin:    admin@agrosmart.com / Administrador2026');
    console.log('  demo operario: operario@agrosmart.com / Trabajador / Operario2026');
  }
});
