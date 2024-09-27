# thebook

## TH-ebook

- Thanh Hung ebook

do an website you can find any book

do an mon .net

## Luu y

- Do an co su khac biet so voi do an asp.net c# binh thuong trong chuong chinh hoc
  1. Database: su dung mongodb thay cho sql server
  2. Project template: su dung ASP.NET Core Web API thay cho ASP .NET Core Web App (Model-View-controller)
    - Tai vi lam front end bang react
  3. IDE: xai vscode thay cho Visual Studio Community 2022
    - Tai vi nhom co vua co thang xai linuc vua co mac vua co win
## Huong dan cach setup

### databay

#### (tuy ban) mongodb atlas

muon xai mongo atlas online thi tuy ban toi ko huong dan o day, hoac:

#### mongodb chay tren may

cai dc linuc thi chac ko can phai xem huong dan
xai mac thi ko biet toi ko co may
`TODO: doi thang dung mac vao ghi cach cai...`

##### cai tren window

`luc cai quen chup hinh nen ko co hinh thong cam`
`sau nay co ai moi cai neu sieng thi chup hinh len`
1. bam download MongoDB Community Server Download o day https://www.mongodb.com/try/download/community
2. file luc toi tai ten la mongodb-windows-x86_64-8.0.0-signed.msi
3. down xong mo len de cai
4. bam next next next
5. de y co hop kiem install mongodb compass thi nho tich
6. hien hop thoai make changes gi do thi bam yes neu hoi pass thi nhap pass
7. luc hien thanh progress bar thi tam ngung bam next
8. bam toi khi nut next thanh nut finish thi la xong

###### mo len xem thu

1. tim MongoDBCompass roi mo len
2. ![image](https://github.com/user-attachments/assets/4b718c51-4ae3-4621-a325-dbecba40baa1)
3. bam + Add new connection
4. ![image](https://github.com/user-attachments/assets/4a6eeffd-fbff-4763-b6d4-8d65025a5e50)
5. bam Connect
6. ![image](https://github.com/user-attachments/assets/722ef494-5b6c-49d2-8782-1d29e729de79)
7. thay hien len x Connected to locahost:27017 thi la xong

#### tao databay

`TODO: chung nao fix xong database se them vao`

#### ket loi appconfig vao mongodb

1. mo file appsettings.json trong project backend
2. ![image](https://github.com/user-attachments/assets/5dfd992d-5cd6-4cbc-af53-42c0a62db4df)
3. de y tien hanh sua 2 cai ConnectionURI va DatabaseName
4. lay ConnectionURI
   1. vao MongoDBCompass
   2. ![image](https://github.com/user-attachments/assets/ac0f31bd-63e1-4733-bb3c-22b917a1ae3d)
   3. tim lai ket loi da connect luc moi cai o tab ben trai
   4. bam nut 3 cham
   5. ![image](https://github.com/user-attachments/assets/82a27f48-8f4d-4f71-a4b4-1a8668a0656e)
   6. bam Copy connection string
   7. bo lai vao file config
   8. ![image](https://github.com/user-attachments/assets/a3157292-5aba-4a12-848b-57ecec90ad36)
5. lay DatabaseName
   1. ban dat ten gi o buoc `tao databay`?
   2. `TODO: chung nao fix xong database se them vao`

## Con tiep...

- con tiep...





