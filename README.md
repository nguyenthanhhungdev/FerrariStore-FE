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

### dev container

1.  co ai chua cai dc moi truong chay dc front end voi back end thi cai docker vao
2.  `vinasupport.com/huong-dan-cai-dat-docker-desktop-tren-macos/`
3.  `codelearn.io/sharing/cai-dat-docker-trong-windows`
4.  `idroot.us/install-docker-desktop-fedora-41/`
5.  neu cai dc r thi vo `docker destop > setting > resource`
6.  https://docs.docker.com/desktop/settings-and-maintenance/settings/#advanced
7.  co su khac nhau khi xai `wsl window, hyper v window va linux va macos` nen tu tim ti
8.  trong day co tuy chon thu muc chua image thi de o khac neu so het dung luong
9.  cac tuy chon:
10. ```
     On the Advanced tab, you can limit resources available to the Docker Linux VM.

     Advanced settings are:

     CPU limit. Specify the maximum number of CPUs to be used by Docker Desktop. By default, Docker Desktop is set to use all the processors available on the host machine.

     Memory limit. By default, Docker Desktop is set to use up to 50% of your host's memory. To increase the RAM, set this to a higher number; to decrease it, lower the number.

     Swap. Configure swap file size as needed. The default is 1 GB.

     Virtual disk limit. Specify the maximum size of the disk image.

     Disk image location. Specify the location of the Linux volume where containers and images are stored.

     You can also move the disk image to a different location. If you attempt to move a disk image to a location that already has one, you are asked if you want to use the existing image or replace it.
    ```

11. r mo vscode pull main moi nhat
12. cai extension:
13. ```
    "ms-azuretools.vscode-docker",
    "ms-vscode-remote.remote-containers"
    ```
14. **(ủa nêu chạy được bình thường có cần dùng docker nữa k á)**
15. **(chay dc roi thi thoi)**
16. tat mo lai vscode
17. bam vo reopen in container nay
18. roi chon 1 cai backend hoac frontend de vao
19. doi vai phut no setup xong la bam chay dc luon
20. xai docker thi ko can phai cai nodejs hay dotnet gi het
21. neu can mo vua frontend vua backend thi mo 2 cua so vscode roi reopen 2 cai

## Con tiep...

- con tiep...
