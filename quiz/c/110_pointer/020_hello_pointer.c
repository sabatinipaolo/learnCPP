#include <stdio.h>

int main()
{
    char c = 'C';
    char d = 'D';
    
    char* pc = &c;
    
    printf("%c\n" ,  c   );
    printf("%c\n" ,  *pc );
    printf("\n");
    
    pc = &d ;
    
    printf("%c\n" ,  c   );
    printf("%c\n" ,  *pc );
    printf("\n");
    
    *pc='Z';
    
    printf("%c\n" ,  d   );
    printf("%c\n" ,  *pc );
    printf("\n");
    
    

}
