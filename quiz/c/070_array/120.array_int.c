#include <stdio.h>

int main()
{
    int a[] = { 2 , 4 , 4 , 1 , 1 , 5 , 4, 4 , 4 , 4 };
    int len_a = 10;

    int i= 0 ;
    while ( i < len_a  ) {

        printf( "%d " , a[i] );
        int ele = a[i];
        while ( (i < (len_a - 1)) && (ele == a[i+1] ) ) 
            i++;
        i++;
    }

}
