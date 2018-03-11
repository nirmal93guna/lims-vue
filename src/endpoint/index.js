var lims = 'https://digital-coe-api.azurewebsites.net/lims3';
var photo = 'https://graph.microsoft.com/beta/me/photo/$value';
export default {
    'createProfile': lims + '/createProfile/',
    'getMyBookIDs': lims + '/getmyMobileAssetBookIds/',
    'getMyBook': lims + '/getmyAsset/',
    'returnRequest': lims + '/returnRequest/',
    'renewBook': lims + '/renewBook/',
    'rating': lims + '/rating/',
    'getCategories': lims + '/getCategories',
    'issue': lims + '/issueBook/',
    'request': lims + '/requestBook/',
    'availabilty': lims + '/availableBooks/',
    'getBook': lims + '/getBook/',
    'getByCategory': lims + '/getCategoryWiseBooks/',
    'getAllIssuedBook': lims + '/getMyIssuedHistory/',
    'getMyReturneddBook': lims + '/getMyReturnedHistory/',
    'getMyHistory': lims + '/getMyIssuedHistory/',
    'getProfile': lims + '/getUserProfile/',
    'updateProfile': lims + '/updateUserProfile/',
    'addNewBook': lims + '/addNewBook',
    'addNewCopy': lims + '/addNewCopy',
    'getAllIssuedBooksHistory': lims + '/getAllIssuedBooksHistory/',
    'geAllReturneddBook': lims + '/getAllReturnedBooksHistory/',
    'getAdminId': lims + '/getAdminId',
    'getAllBooks': lims + '/getAllBooks/',
    'getAllRequestBooksHistory': lims + '/getAllRequestBooksHistory/',
    'declineRequest': lims + '/declineRequest/',
    'getAllReturnRequestBooksHistory': lims + '/getAllReturnRequestBooksHistory/',
    'return': lims + '/return/',
    'getAllAdminDetails': lims + '/getAllAdminDetails/',
    'transferAccess': lims + '/transferAccess/',
    'getBookForDetailView': lims + '/getBookForDetailView/',
    'getMyFavGenre': lims + '/getMyFavGenre/',
    'getNotifications': lims + '/getNotifications/',
    'recommend': lims + '/recommend/',
    'addtowishlist': lims + '/addtowishlist/',
    'getisbndetails': lims + '/getisbndetails/',
    'getwishlist': lims + '/getwishlist/',
    'removewishlist': lims + '/removewishlist/',
    'getPhoto': photo
}