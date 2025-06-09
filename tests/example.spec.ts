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

