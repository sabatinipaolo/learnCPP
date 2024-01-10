#include <stdio.h>

void scrive_ciao()
{
    printf("ciao\n");
}

void scrive_2_ciao(){
      printf("ciao\n");
      printf("ciao\n");   
}

void scrive_3_ciao(){
      printf("ciao\n");
      printf("ciao\n");   
      printf("ciao\n"); 
}

int main()
{
    scrive_3_ciao();
    scrive_2_ciao();
}