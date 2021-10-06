export const CategoryComponent = {
    data () {
        return {
            categories: [
                {
                    id: 1,
                    title: 'Alat Tulis'
                },
                {
                    id: 2,
                    title: 'Alat Mandi'
                },
                {
                    id: 3,
                    title: 'Alat Masak'
                },
                
            ]
        }
    },
    template: `
        <div>
            <h1>Daftar Kategori</h1>
            <ul>
                <li v-for="category of categories"> 
                        {{ category.title }}
                </li>
            </ul>
        </div>
    ` 
}