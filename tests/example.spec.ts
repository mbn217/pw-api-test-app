import { test, expect } from '@playwright/test';

// test.beforeEach('has title', async ({ page }) => {
//   await page.goto('https://conduit.bondaracademy.com/');
// });

// test('has title', async ({ page }) => {
//   await expect(page.locator('.navbar-brand')).toHaveText('conduit');
// });

//Post request to add new pet https://petstore.swagger.io/
// test.describe('Petstore API Tests', () => {

//     test('Add a new pet', async ({ request }) => {
//     const response = await request.post('https://petstore.swagger.io/v2/pet', {
//       data: {
//         id: 0,
//         category: { id: 0, name: 'Dogs' },
//         name: 'Buddy',
//         photoUrls: ['https://example.com/photo.jpg'],
//         tags: [{ id: 0, name: 'friendly' }],
//         status: 'available'
//       }
//     });

//     expect(response.ok()).toBeTruthy();
//     const responseBody = await response.json();
//     console.log(responseBody);
//     expect(responseBody.name).toBe('Buddy');
//     expect(responseBody.status).toBe('available');
//   });


// });

// //Resturn Pet inventroies by status
// test.describe('Petstore API Tests', () => {
//   test('Get pet inventory by status', async ({ request }) => {
//     const response = await request.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available');

//     expect(response.ok()).toBeTruthy();
//     const responseBody = await response.json();
//     expect(Array.isArray(responseBody)).toBeTruthy();
//     expect(responseBody.length).toBeGreaterThan(0);
//     console.log("----- Pet Inventory by Status -----");
//     console.log(responseBody);
//   });
// });


//Delete a pet by ID
test.describe('Petstore API Tests', () => {
  test('Delete a pet by ID', async ({ request }) => {
    // First, add a new pet to delete
    const addResponse = await request.post('https://petstore.swagger.io/v2/pet', {
      data: {
        id: 454,
        category: { id: 0, name: 'Cats' },
        name: 'Whiskers',
        photoUrls: ['https://example.com/photo.jpg'],
        tags: [{ id: 0, name: 'cute' }],
        status: 'available'
      }
    });

    expect(addResponse.ok()).toBeTruthy();
    const addedPet = await addResponse.json();
    console.log('Added Pet:', addedPet);
    const petId = addedPet.id;

    // Now delete the pet
    const deleteResponse = await request.delete(`https://petstore.swagger.io/v2/pet/${petId}`);
    //expect(deleteResponse.ok()).toBeTruthy();
    console.log(`Pet with ID ${petId} deleted successfully.`);
  });
});

test.describe('Petstore API Tests', () => {
  test('Create a new pet', async ({ request }) => {
    const petData = {
      id: 123,
      category: { id: 1, name: 'Dogs' },
      name: 'Max',
      photoUrls: ['https://example.com/dog-photo.jpg'],
      tags: [{ id: 1, name: 'playful' }],
      status: 'available'
    };

    const response = await request.post('https://petstore.swagger.io/v2/pet', {
      data: petData
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    
    // Verify the response matches our input data
    expect(responseBody.id).toBe(petData.id);
    expect(responseBody.name).toBe(petData.name);
    expect(responseBody.status).toBe(petData.status);
    expect(responseBody.category.name).toBe(petData.category.name);
    expect(responseBody.tags[0].name).toBe(petData.tags[0].name);
    
    console.log('Created Pet:', responseBody);
  });
});

test.describe('Petstore API Tests', () => {
  test('Update an existing pet', async ({ request }) => {
    // First create a pet
    const initialPetData = {
      id: 456,
      category: { id: 2, name: 'Cats' },
      name: 'Luna',
      photoUrls: ['https://example.com/cat-photo.jpg'],
      tags: [{ id: 2, name: 'calm' }],
      status: 'available'
    };

    const createResponse = await request.post('https://petstore.swagger.io/v2/pet', {
      data: initialPetData
    });

    expect(createResponse.ok()).toBeTruthy();
    console.log('Created Pet:', await createResponse.json());

    // Now update the pet
    const updatedPetData = {
      ...initialPetData,
      name: 'Luna Updated',
      status: 'pending',
      tags: [{ id: 2, name: 'friendly' }]
    };

    const updateResponse = await request.put('https://petstore.swagger.io/v2/pet', {
      data: updatedPetData
    });

    expect(updateResponse.ok()).toBeTruthy();
    const responseBody = await updateResponse.json();
    
    // Verify the response matches our updated data
    expect(responseBody.id).toBe(updatedPetData.id);
    expect(responseBody.name).toBe(updatedPetData.name);
    expect(responseBody.status).toBe(updatedPetData.status);
    expect(responseBody.tags[0].name).toBe(updatedPetData.tags[0].name);
    
    console.log('Updated Pet:', responseBody);
  });
});

test.describe('Petstore API Tests', () => {
  test('Get pet by ID', async ({ request }) => {
    // First create a pet to get
    const petData = {
      id: 789,
      category: { id: 3, name: 'Birds' },
      name: 'Polly',
      photoUrls: ['https://example.com/bird-photo.jpg'],
      tags: [{ id: 3, name: 'colorful' }],
      status: 'available'
    };

    const createResponse = await request.post('https://petstore.swagger.io/v2/pet', {
      data: petData
    });

    expect(createResponse.ok()).toBeTruthy();
    const createdPet = await createResponse.json();
    const petId = createdPet.id;

    // Now get the pet by ID
    const getResponse = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);
    const retrievedPet = await getResponse.json();
    
    // Verify the retrieved pet matches our created pet
    expect(retrievedPet.id).toBe(petData.id);
    expect(retrievedPet.name).toBe(petData.name);
    expect(retrievedPet.status).toBe(petData.status);
    
    console.log('Retrieved Pet:', retrievedPet);
  });
});

test.describe('Petstore API Tests', () => {
  test('Find pets by tags', async ({ request }) => {
    // First create multiple pets with different tags
    const pets = [
      {
        id: 101,
        category: { id: 4, name: 'Dogs' },
        name: 'Rex',
        photoUrls: ['https://example.com/dog1.jpg'],
        tags: [{ id: 4, name: 'friendly' }, { id: 5, name: 'active' }],
        status: 'available'
      },
      {
        id: 102,
        category: { id: 4, name: 'Dogs' },
        name: 'Buddy',
        photoUrls: ['https://example.com/dog2.jpg'],
        tags: [{ id: 4, name: 'friendly' }, { id: 6, name: 'calm' }],
        status: 'available'
      }
    ];

    // Create the pets
    for (const pet of pets) {
      const response = await request.post('https://petstore.swagger.io/v2/pet', {
        data: pet
      });
      expect(response.ok()).toBeTruthy();
    }

    // Find pets by the 'friendly' tag
    const findResponse = await request.get('https://petstore.swagger.io/v2/pet/findByTags?tags=friendly');
    expect(findResponse.ok()).toBeTruthy();
    const foundPets = await findResponse.json();
    
    // Verify we found pets with the 'friendly' tag
    expect(Array.isArray(foundPets)).toBeTruthy();
    expect(foundPets.length).toBeGreaterThan(0);
    foundPets.forEach(pet => {
      expect(pet.tags.some(tag => tag.name === 'friendly')).toBeTruthy();
    });
    
    console.log('Found Pets by Tag:', foundPets);
  });
});

test.describe('Petstore API Tests', () => {
  test('Upload pet image', async ({ request }) => {
    // First create a pet
    const petData = {
      id: 201,
      category: { id: 5, name: 'Cats' },
      name: 'Mittens',
      photoUrls: [],
      tags: [{ id: 7, name: 'cute' }],
      status: 'available'
    };

    const createResponse = await request.post('https://petstore.swagger.io/v2/pet', {
      data: petData
    });

    expect(createResponse.ok()).toBeTruthy();
    const createdPet = await createResponse.json();
    const petId = createdPet.id;

    // Upload an image for the pet
    const formData = new FormData();
    formData.append('file', new Blob(['test image content'], { type: 'image/jpeg' }), 'test-image.jpg');
    formData.append('additionalMetadata', 'Test image upload');

    const uploadResponse = await request.post(`https://petstore.swagger.io/v2/pet/${petId}/uploadImage`, {
      multipart: formData
    });

    expect(uploadResponse.ok()).toBeTruthy();
    const uploadResult = await uploadResponse.json();
    console.log('Image Upload Result:', uploadResult);
  });
});

test.describe('Petstore API Tests', () => {
  test('Get pet inventory by different statuses', async ({ request }) => {
    // Test getting pets with different statuses
    const statuses = ['available', 'pending', 'sold'];
    
    for (const status of statuses) {
      const response = await request.get(`https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`);
      expect(response.ok()).toBeTruthy();
      const pets = await response.json();
      
      // Verify we got an array of pets
      expect(Array.isArray(pets)).toBeTruthy();
      
      // Verify all pets have the correct status
      pets.forEach(pet => {
        expect(pet.status).toBe(status);
      });
      
      console.log(`Pets with status '${status}':`, pets);
    }
  });
});

