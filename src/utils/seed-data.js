/**
 * Seed Data for Testing
 *
 * NOTE: Test için örnek çalışan verileri.
 * Console'da seedTestData() çağırarak test datası eklenebilir.
 */

import { addEmployee } from '../store/actions.js';

export const testEmployees = [
  {
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@ing.com',
    phone: '532 123 45 67',
    dateOfBirth: '1990-05-15',
    dateOfEmployment: '2020-01-10',
    department: 'Tech',
    position: 'Senior',
  },
  {
    firstName: 'Ayşe',
    lastName: 'Demir',
    email: 'ayse.demir@ing.com',
    phone: '533 234 56 78',
    dateOfBirth: '1992-08-20',
    dateOfEmployment: '2021-03-15',
    department: 'Analytics',
    position: 'Medior',
  },
  {
    firstName: 'Mehmet',
    lastName: 'Kaya',
    email: 'mehmet.kaya@ing.com',
    phone: '534 345 67 89',
    dateOfBirth: '1995-02-10',
    dateOfEmployment: '2022-06-01',
    department: 'Tech',
    position: 'Junior',
  },
  {
    firstName: 'Fatma',
    lastName: 'Şahin',
    email: 'fatma.sahin@ing.com',
    phone: '535 456 78 90',
    dateOfBirth: '1988-11-25',
    dateOfEmployment: '2019-09-20',
    department: 'Analytics',
    position: 'Senior',
  },
  {
    firstName: 'Ali',
    lastName: 'Çelik',
    email: 'ali.celik@ing.com',
    phone: '536 567 89 01',
    dateOfBirth: '1993-04-18',
    dateOfEmployment: '2021-11-05',
    department: 'Tech',
    position: 'Medior',
  },
  {
    firstName: 'Zeynep',
    lastName: 'Arslan',
    email: 'zeynep.arslan@ing.com',
    phone: '537 678 90 12',
    dateOfBirth: '1996-07-30',
    dateOfEmployment: '2023-02-14',
    department: 'Analytics',
    position: 'Junior',
  },
  {
    firstName: 'Can',
    lastName: 'Öztürk',
    email: 'can.ozturk@ing.com',
    phone: '538 789 01 23',
    dateOfBirth: '1991-12-05',
    dateOfEmployment: '2020-08-18',
    department: 'Tech',
    position: 'Senior',
  },
  {
    firstName: 'Elif',
    lastName: 'Kurt',
    email: 'elif.kurt@ing.com',
    phone: '539 890 12 34',
    dateOfBirth: '1994-03-22',
    dateOfEmployment: '2022-01-25',
    department: 'Analytics',
    position: 'Medior',
  },
  {
    firstName: 'Burak',
    lastName: 'Aydın',
    email: 'burak.aydin@ing.com',
    phone: '531 901 23 45',
    dateOfBirth: '1997-09-08',
    dateOfEmployment: '2023-05-10',
    department: 'Tech',
    position: 'Junior',
  },
  {
    firstName: 'Deniz',
    lastName: 'Koç',
    email: 'deniz.koc@ing.com',
    phone: '532 012 34 56',
    dateOfBirth: '1989-06-14',
    dateOfEmployment: '2019-04-12',
    department: 'Analytics',
    position: 'Senior',
  },
  {
    firstName: 'Cem',
    lastName: 'Polat',
    email: 'cem.polat@ing.com',
    phone: '533 123 45 67',
    dateOfBirth: '1992-01-28',
    dateOfEmployment: '2021-07-08',
    department: 'Tech',
    position: 'Medior',
  },
  {
    firstName: 'Selin',
    lastName: 'Yıldız',
    email: 'selin.yildiz@ing.com',
    phone: '534 234 56 78',
    dateOfBirth: '1995-10-19',
    dateOfEmployment: '2022-10-22',
    department: 'Analytics',
    position: 'Junior',
  },
];

/**
 * Test datasını yükle
 * Console'da window.seedTestData() ile çağırabilirsiniz
 */
export function seedTestData(count = 100) {
  console.log(`Loading ${count} test employees...`);

  const firstNames = ['Ahmet', 'Ayşe', 'Mehmet', 'Fatma', 'Ali', 'Zeynep', 'Can', 'Elif', 'Burak', 'Deniz', 'Cem', 'Selin', 'Emre', 'Merve', 'Murat', 'Esra', 'Kemal', 'Burcu', 'Oğuz', 'Pınar'];
  const lastNames = ['Yılmaz', 'Demir', 'Kaya', 'Şahin', 'Çelik', 'Arslan', 'Öztürk', 'Kurt', 'Aydın', 'Koç', 'Polat', 'Yıldız', 'Özdemir', 'Aksoy', 'Erdoğan', 'Güler', 'Türk', 'Yavuz', 'Kaplan', 'Çakır'];
  const departments = ['Tech', 'Analytics'];
  const positions = ['Junior', 'Medior', 'Senior'];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const position = positions[Math.floor(Math.random() * positions.length)];

    // Random phone (5XX XXX XX XX)
    const phone = `5${Math.floor(Math.random() * 100).toString().padStart(2, '3')} ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')} ${Math.floor(Math.random() * 100).toString().padStart(2, '0')} ${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`;

    // Random date of birth (1985-2000)
    const birthYear = 1985 + Math.floor(Math.random() * 15);
    const birthMonth = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
    const birthDay = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');

    // Random employment date (2015-2024)
    const empYear = 2015 + Math.floor(Math.random() * 10);
    const empMonth = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
    const empDay = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');

    addEmployee({
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@ing.com`,
      phone,
      dateOfBirth: `${birthYear}-${birthMonth}-${birthDay}`,
      dateOfEmployment: `${empYear}-${empMonth}-${empDay}`,
      department,
      position,
    });
  }

  console.log(`✅ ${count} test employees added!`);
}

// Global olarak erişilebilir yap (development için)
if (typeof window !== 'undefined') {
  window.seedTestData = seedTestData;
}
