import * as SecureStore from 'expo-secure-store';

export async function getUserId() {
  try {
    const userId = await SecureStore.getItemAsync('userId');
    if (userId) {
      // UserId retrieved successfully
      console.log('User ID:', userId);
      return parseInt(userId);
    } else {
      // UserId not found in SecureStore
      console.log('User ID not found');
      return null;
    }
  } catch (error) {
    // Error retrieving userId
    console.error('Error retrieving user ID:', error);
    return null;
  }
}

export function getContributorName(item) {
    return item ? item.split("->")[0] : "";
}
export function getContributorOrcid(item) {
    return item ? item.split("->")[1] : "";
}

